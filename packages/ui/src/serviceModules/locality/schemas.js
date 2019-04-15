import immutable from 'object-path-immutable'
import schemaInterface from 'common/src/schemaInterface'

const models = schemaInterface.getModels()

const createFormModels = () => {
  let updatedModels = { ...models }

  updatedModels = immutable.set(updatedModels, 'place.required', [
    'group',
    'name',
    'parent',
  ])

  updatedModels = immutable.set(updatedModels, 'place.properties.group', {
    minLength: 1,
    type: 'string',
  })

  updatedModels = immutable.set(updatedModels, 'place.properties.name', {
    minLength: 1,
    type: 'string',
  })

  updatedModels = immutable.set(updatedModels, 'place.properties.parent', {
    properties: {
      id: {
        minLength: 1,
        type: 'string',
      },
    },
    required: ['id'],
    type: 'object',
  })

  return updatedModels
}

const formModels = createFormModels()

export { formModels }
