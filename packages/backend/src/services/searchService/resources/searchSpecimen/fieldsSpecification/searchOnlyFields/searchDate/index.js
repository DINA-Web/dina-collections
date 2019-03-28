const getInterpretedTimestampFromYMD = require('common/src/date/getInterpretedTimestampFromYMD')

const {
  createNestedMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.searchOnlyFields.searchDate'
const key = 'searchDate'
const searchFilterName = 'searchDates'

const transformation = ({ migrator, src, target }) => {
  const collectingEventDateRange = migrator.getValue({
    obj: src,
    path: 'individual.collectingInformation.0.event.dateRange',
  })

  if (!collectingEventDateRange) {
    return null
  }

  const dates = []

  if (collectingEventDateRange.startDate || collectingEventDateRange.endDate) {
    let startTimestamp
    if (collectingEventDateRange.startDate) {
      startTimestamp =
        getInterpretedTimestampFromYMD({
          ...collectingEventDateRange.startDate,
          isStartDate: true,
        }) || collectingEventDateRange.startDate.interpretedTimestamp
    }

    let endTimestamp
    if (collectingEventDateRange.endDate) {
      endTimestamp =
        getInterpretedTimestampFromYMD({
          ...collectingEventDateRange.endDate,
          isEndDate: true,
          moveCurrentYearEndDateToNow: true,
        }) || collectingEventDateRange.endDate.interpretedTimestamp
    }

    if (startTimestamp || endTimestamp) {
      dates.push({
        dateType: 'collecting-event-start-date',
        endTimestamp,
        startTimestamp,
      })
    }
  }

  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: dates,
  })

  return null
}

const searchFilter = {
  description: 'Search date',
  elasticsearch: ({ value = {} }) => {
    const { end, endDate = {}, invalid, start, startDate = {} } = value

    const must = []
    const mustNot = []
    if (invalid) {
      mustNot.push({
        match_all: {},
      })
    }

    if (start) {
      const startTimestamp =
        getInterpretedTimestampFromYMD({
          ...startDate,
          isStartDate: true,
        }) || start

      must.push({
        range: {
          [`${fieldPath}.startTimestamp`]: {
            gte: startTimestamp,
          },
        },
      })
    }

    if (end) {
      const endTimestamp =
        getInterpretedTimestampFromYMD({
          ...endDate,
          isEndDate: true,
          moveCurrentYearEndDateToNow: true,
        }) || end

      must.push({
        range: {
          [`${fieldPath}.endTimestamp`]: {
            lte: endTimestamp,
          },
        },
      })
    }

    return {
      nested: {
        path: fieldPath,
        query: {
          bool: {
            must,
            must_not: mustNot,
          },
        },
      },
    }
  },
  inputSchema: {
    type: 'object',
  },
  key: searchFilterName,
}

module.exports = {
  fieldPath,
  filters: {
    [searchFilterName]: searchFilter,
  },
  key,
  mapping: createNestedMapping({
    fieldPath,
  }),
  selectable: true,
  transformation,
}
