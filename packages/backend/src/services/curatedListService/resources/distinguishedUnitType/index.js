const createDistinguishedUnitTypeRequestSuccess = require('./operations/create/examples/requestSuccess.json')

module.exports = {
  basePath: '/api/curatedList/v01',
  operations: [
    {
      exampleRequests: {
        primary: createDistinguishedUnitTypeRequestSuccess,
      },
      type: 'create',
    },
    {
      type: 'update',
    },
    {
      type: 'getOne',
    },
    {
      type: 'getMany',
    },
  ],

  resource: 'distinguishedUnitType',
}
