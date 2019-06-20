const mappingSpecification = require('./mappingSpecification')
const fieldsSpecification = require('./fieldsSpecification')
const extractSortableFields = require('../../../../lib/data/fields/utilities/extractSortableFields')
const extractSelectableFields = require('../../../../lib/data/fields/utilities/extractSelectableFields')

const {
  updateView: updateViewTransformationSpecification,
  rebuildView: rebuildViewTransformationSpecification,
} = require('./transformationSpecifications')

const {
  getMany: getManyFilterSpecification,
  query: queryFilterSpecification,
} = require('./filterSpecifications')

const {
  rebuildView: rebuildViewPostHooks,
  updateView: updateViewPostHooks,
} = require('./postHooks')

const aggregationSpecification = require('./aggregationSpecification')

const resource = 'searchNormalizedAgent'

const sortableFields = extractSortableFields({ fieldsSpecification })
const selectableFields = extractSelectableFields({ fieldsSpecification })

module.exports = {
  model: {
    mappingSpecification,
    name: 'searchNormalizedAgent',
    rebuildStrategy: 'swap',
    type: 'elasticsearchDocumentModel',
  },
  operations: [
    {
      selectableFields,
      type: 'getOne',
    },
    {
      aggregationSpecification,
      filterSpecification: queryFilterSpecification,
      selectableFields,
      sortableFields,
      type: 'query',
    },
    {
      type: 'del',
    },
    {
      filterSpecification: getManyFilterSpecification,
      selectableFields,
      sortableFields,
      type: 'getMany',
    },
    {
      type: 'emptyView',
    },
    {
      postHooks: updateViewPostHooks,
      queryParams: {
        consolidateJobs: {
          description: 'Will consolidate jobs in postHook',
          schema: {
            default: false,
            type: 'boolean',
          },
        },
      },
      transformationSpecification: updateViewTransformationSpecification,
      type: 'updateView',
    },
    {
      postHooks: rebuildViewPostHooks,
      queryParams: {
        consolidateJobs: {
          description: 'Will consolidate jobs in postHook',
          schema: {
            default: false,
            type: 'boolean',
          },
        },
        force: {
          description:
            'Will rebuild view even if last rebuild ended with error',
          schema: {
            default: true,
            type: 'boolean',
          },
        },
      },
      transformationSpecification: rebuildViewTransformationSpecification,
      type: 'rebuildView',
    },
    {
      type: 'getViewMeta',
    },
  ],
  resource,
}
