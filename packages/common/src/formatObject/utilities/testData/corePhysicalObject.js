/* eslint-disable sort-keys */
module.exports = {
  attributes: { lid: 'dda3594e-3bf6-4cb7-bd63-cd4d649ff6b2' },
  id: '1',
  relationships: {
    resourceActivities: { data: [] },
    specimens: { data: [] },
    storageLocation: {
      data: {
        id: '2',
        relationships: {
          children: { data: [] },
          physicalObjects: { data: [] },
          preparationTypes: { data: [] },
          resourceActivities: { data: [] },
          taxa: { data: [] },
        },
        type: 'storageLocation',
      },
    },
  },
  type: 'physicalObject',
}
