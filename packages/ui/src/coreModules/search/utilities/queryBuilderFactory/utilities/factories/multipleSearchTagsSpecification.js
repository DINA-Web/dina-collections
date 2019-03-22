import objectPath from 'object-path'

export default function multipleSearchTagsSpecification({
  sectionName,
  includeTagTypesInAggregation = true,
  matchFilterFunctionName,
  searchFilterFunctionName,
  tagTypeAggregationFunctionName,
  tagValuesAggregationFunctionName,
  tagValuesFieldName,
}) {
  const tagValuesAggregation = ({ input = {}, sectionValues }) => {
    const selectedTagTypes = sectionValues && sectionValues.tagTypes

    const {
      exact,
      tagType: tagInputType,
      tagValue,
      limit = 10,
      aggregationFunctionType = 'value',
    } = input

    if (aggregationFunctionType === 'type') {
      return {
        aggregationFunction: tagTypeAggregationFunctionName,
      }
    }

    const tagTypes = tagInputType ? [tagInputType] : selectedTagTypes

    return {
      aggregationFunction: tagValuesAggregationFunctionName,
      input: {
        exact,
        limit,
        tagTypes: includeTagTypesInAggregation ? tagTypes : undefined,
        tagValue,
      },
    }
  }

  const searchFilter = ({ input }) => {
    const { tagType, tagValue } = input
    return {
      filter: {
        filterFunction: searchFilterFunctionName,
        input: {
          tagType,
          tagValue,
        },
      },
    }
  }

  const matchTagValuesFilter = ({ fieldValue }) => {
    if (!fieldValue) {
      return null
    }

    const tagFilters = []
    Object.keys(fieldValue).forEach(key => {
      const dropdownEntry = fieldValue[key]

      const isFreeText =
        objectPath.get(dropdownEntry, 'searchOption.other.optionType') ===
        'freeText'
      const hasNoMatchingTag = !objectPath.get(dropdownEntry, 'matchingTags')
        .length

      if (isFreeText && hasNoMatchingTag) {
        tagFilters.push({
          filter: {
            filterFunction: searchFilterFunctionName,
            input: {
              tagType: objectPath.get(
                dropdownEntry,
                'searchOption.other.tagType'
              ),

              tagValue: objectPath.get(
                dropdownEntry,
                'searchOption.other.tagValue'
              ),
            },
          },
        })
      } else {
        fieldValue[key].matchingTags
          .filter(tag => {
            return !!tag.selected
          })
          .forEach(tag => {
            tagFilters.push({
              filter: {
                filterFunction: matchFilterFunctionName,
                input: {
                  tagType: tag.attributes.tagType,
                  tagValue: tag.attributes.tagValue,
                },
              },
            })
          })
      }
    })

    if (!tagFilters.length) {
      return null
    }

    return {
      or: tagFilters,
    }
  }

  return [
    {
      aggregation: tagValuesAggregation,
      fieldName: tagValuesFieldName,
      matchFilter: matchTagValuesFilter,
      searchFilter: searchFilterFunctionName && searchFilter,
      sectionName,
    },
  ]
}
