import createMultipleSearchTagsSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/multipleSearchTagsSpecification'

export default createMultipleSearchTagsSpecification({
  matchFilterFunctionName: 'matchAgentTags',
  searchFilterFunctionName: 'searchNormalizedAgentTags',
  sectionName: 'agent',
  tagTypeAggregationFunctionName: 'aggregateAgentTagTypes',
  tagValuesAggregationFunctionName: 'aggregateAgentTagValues',
  tagValuesFieldName: 'agent.tagValues',
})
