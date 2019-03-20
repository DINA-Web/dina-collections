const extractFeatureText = require('../../utilities/extractFeatureText')
const createStringAggregation = require('../../../../../../../lib/data/aggregations/factories/createStringAggregation')
const {
  createTagMatchFilter,
  createStringSearchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createKeywordMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.tags.sexTags'
const key = 'sexTags'
const resource = 'sexTag'
const aggregationName = 'aggregateSexTags'
const searchFilterName = 'searchSexTags'
const matchFilterName = 'matchSexTags'

const FEATURE_TYPE = 'sex'

const transformation = ({ migrator, src, target }) => {
  const featureTexts = extractFeatureText({
    featureTypeKey: FEATURE_TYPE,
    migrator,
    src,
  })
  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: featureTexts,
  })

  return null
}

module.exports = {
  aggregations: {
    [aggregationName]: createStringAggregation({
      fieldPath,
      resource,
    }),
  },
  fieldPath,
  filters: {
    [matchFilterName]: createTagMatchFilter({
      fieldPath,
      nested: false,
    }),
    [searchFilterName]: createStringSearchFilter({
      fieldPath,
    }),
  },
  key,
  mapping: createKeywordMapping({
    fieldPath,
    lowercase: true,
  }),
  selectable: true,
  transformation,
}
