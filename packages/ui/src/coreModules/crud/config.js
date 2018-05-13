const config = {
  resources: {
    causeOfDeathType: {
      customSelectors: [
        {
          text: {
            defaultLanguage: 'en',
            parameter: 'attributes.name',
            translated: true,
          },
          type: 'getAllAsOptions',
        },
      ],
      operations: [
        {
          operationId: 'causeOfDeathTypeGetOne',
          type: 'getOne',
        },
        {
          operationId: 'causeOfDeathTypeGetMany',
          type: 'getMany',
        },
      ],
    },
    establishmentMeansType: {
      customSelectors: [
        {
          text: {
            parameter: 'attributes.name',
            translated: true,
          },
          type: 'getAllAsOptions',
        },
      ],
      operations: [
        {
          operationId: 'establishmentMeansTypeGetOne',
          type: 'getOne',
        },
        {
          operationId: 'establishmentMeansTypeGetMany',
          type: 'getMany',
        },
      ],
    },

    featureType: {
      operations: [
        {
          operationId: 'featureTypeGetOne',
          type: 'getOne',
        },
        {
          operationId: 'featureTypeGetMany',
          type: 'getMany',
        },
      ],
    },

    identifierType: {
      customSelectors: [
        {
          text: {
            parameter: 'attributes.name',
            translated: false,
          },
          type: 'getAllAsOptions',
        },
      ],
      operations: [
        {
          operationId: 'identifierTypeGetOne',
          type: 'getOne',
        },
        {
          operationId: 'identifierTypeGetMany',
          type: 'getMany',
        },
      ],
    },
    physicalObject: {
      operations: [
        {
          operationId: 'physicalObjectGetOne',
          type: 'getOne',
        },
        {
          operationId: 'physicalObjectCreate',
          type: 'create',
        },
        {
          operationId: 'physicalObjectGetMany',
          type: 'getMany',
        },
        {
          operationId: 'physicalObjectUpdate',
          type: 'update',
        },
      ],
    },
    place: {
      operations: [
        {
          operationId: 'placeGetOne',
          type: 'getOne',
        },
        {
          operationId: 'placeCreate',
          type: 'create',
        },
        {
          operationId: 'placeGetMany',
          type: 'getMany',
        },
        {
          operationId: 'placeUpdate',
          type: 'update',
        },
      ],
    },

    preparationType: {
      operations: [
        {
          operationId: 'preparationTypeGetOne',
          type: 'getOne',
        },
        {
          operationId: 'preparationTypeGetMany',
          type: 'getMany',
        },
      ],
    },

    specimen: {
      operations: [
        {
          operationId: 'specimenUpdate',
          options: {
            relationshipKeysToIncludeInBody: [
              'causeOfDeathTypes',
              'establishmentMeansTypes',
              'featureTypes',
              'identifierTypes',
              'places',
              'preparationTypes',
              'taxa',
              'typeSpecimenTypes',
            ],
            resourcesToModify: ['specimen', 'physicalObject'],
          },
          type: 'update',
        },
        {
          operationId: 'specimenCreate',
          options: {
            relationshipKeysToIncludeInBody: [
              'causeOfDeathTypes',
              'establishmentMeansTypes',
              'featureTypes',
              'identifierTypes',
              'places',
              'preparationTypes',
              'taxa',
              'typeSpecimenTypes',
            ],
            resourcesToModify: ['specimen', 'physicalObject'],
          },
          type: 'create',
        },
        {
          operationId: 'specimenGetOne',
          type: 'getOne',
        },
        {
          operationId: 'specimenGetMany',
          type: 'getMany',
        },
      ],
    },
    storageLocation: {
      operations: [
        {
          operationId: 'storageLocationGetOne',
          type: 'getOne',
        },
        {
          operationId: 'storageLocationCreate',
          type: 'create',
        },
        {
          operationId: 'storageLocationGetMany',
          type: 'getMany',
        },
        {
          operationId: 'storageLocationUpdate',
          type: 'update',
        },
      ],
    },
    taxon: {
      operations: [
        {
          operationId: 'taxonGetOne',
          type: 'getOne',
        },
        {
          operationId: 'taxonCreate',
          // options: {
          //   relationshipKeysToIncludeInBody: [
          //     'acceptedTaxonName',
          //     'parent',
          //     'synonyms',
          //     'vernacularNames',
          //   ],
          // },
          type: 'create',
        },
        {
          operationId: 'taxonGetMany',
          type: 'getMany',
        },
        {
          operationId: 'taxonUpdate',
          // options: {
          //   relationshipKeysToIncludeInBody: [
          //     'acceptedTaxonName',
          //     'parent',
          //     'synonyms',
          //     'vernacularNames',
          //   ],
          // },
          type: 'update',
        },
      ],
    },
    taxonName: {
      operations: [
        {
          operationId: 'taxonNameGetOne',
          type: 'getOne',
        },
        {
          operationId: 'taxonNameCreate',
          type: 'create',
        },
        {
          operationId: 'taxonNameGetMany',
          type: 'getMany',
        },
        {
          operationId: 'taxonNameUpdate',
          type: 'update',
        },
      ],
    },
    typeSpecimenType: {
      customSelectors: [
        {
          text: {
            parameter: 'attributes.name',
            translated: false,
          },
          type: 'getAllAsOptions',
        },
      ],
      operations: [
        {
          operationId: 'typeSpecimenTypeGetOne',
          type: 'getOne',
        },
        {
          operationId: 'typeSpecimenTypeGetMany',
          type: 'getMany',
        },
      ],
    },
  },
}

export default config
