/* eslint-disable camelcase */

module.exports = function parseResponse({
  aggregationType,
  res,
  resource,
  testCase,
}) {
  const { raw } = testCase
  if (!raw) {
    return res
  }

  if (aggregationType === 'tagValues') {
    return {
      data:
        res.meta.aggregations[resource].filter.tagKeys.buckets.map(
          ({
            doc_count,
            key: rawKey,
            tagType: tagTypeSection,
            tagText: tagTextSection,
            tagValue: tagValueSection,
          }) => {
            const delimiter = 'ddaadd'
            const keySections = rawKey.split(delimiter)
            const key = keySections.join('-')

            const tagType = tagTypeSection.buckets[0].key
            const tagValue = tagValueSection.buckets[0].key.trim()
            const tagText = tagTextSection.buckets[0].key
            return {
              attributes: {
                count: doc_count,
                key,
                tagText,
                tagType,
                tagValue,
                type: resource,
              },
              id: key,
              type: 'customObject',
            }
          }
        ) || [],
    }
  }
  if (aggregationType === 'tagTypes') {
    return {
      data:
        res.meta.aggregations[resource].filter.tagType.buckets.map(
          ({ doc_count, key }) => {
            return {
              attributes: {
                count: doc_count,
                key,
                tagType: key,
                type: resource,
              },
              id: key,
              type: 'customObject',
            }
          }
        ) || [],
    }
  }

  throw new Error(`Unknown aggregationType: ${aggregationType}`)
}
