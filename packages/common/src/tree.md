```bash
├── Dependor
│   └── index.js
├── apiClient
│   ├── createApiMethod.js
│   ├── createDownloadFile.js
│   ├── createRequest
│   │   ├── index.js
│   │   ├── mapInput.js
│   │   └── validateInput.js
│   ├── createRequestHandler.js
│   ├── createResponse
│   │   ├── index.js
│   │   ├── mapOutput.js
│   │   └── validateOutput.js
│   ├── error
│   │   └── index.js
│   ├── fetch
│   │   ├── createBody.js
│   │   ├── createFormBody.js
│   │   ├── createJsonBody.js
│   │   ├── createQueryString.js
│   │   ├── createQueryString.test.js
│   │   ├── createUrl.js
│   │   ├── index.js
│   │   ├── interpolateUrl.js
│   │   └── parseResponse.js
│   ├── index.js
│   ├── index.test.js
│   ├── intercept
│   │   └── index.js
│   ├── schemas
│   │   ├── apiConfigSchema.js
│   │   ├── endpointConfigSchema.js
│   │   ├── jsonApi.json
│   │   └── methodConfigSchema.js
│   ├── utilities
│   │   └── extractMethodsFromConfigs.js
│   └── validation
│       ├── validateApiConfig.js
│       ├── validateEndpointConfig.js
│       └── validateMethodConfig.js
├── asyncReduce
│   └── index.js
├── batch
│   ├── execute
│   │   ├── execute.test.js
│   │   └── index.js
│   ├── index.js
│   ├── map
│   │   ├── index.js
│   │   └── index.test.js
│   └── reduce
│       └── index.js
├── buildFileTrees
│   └── index.js
├── buildOperationId
│   ├── buildOperationId.test.js
│   └── index.js
├── chainPromises
│   └── index.js
├── constants
│   ├── frontendErrorLogging.js
│   ├── recordHistoryEvents.js
│   ├── repo.js
│   └── storage.js
├── coordinates
│   └── Converter.js
├── createDeleteProperties
│   ├── index.js
│   └── index.test.js
├── createLid
│   ├── index.js
│   └── index.test.js
├── date
│   ├── buildDateRange.js
│   ├── buildYYYYMMDD.js
│   ├── constants.js
│   ├── formatAsTimestamp.js
│   ├── getCurrentUTCTimestamp.js
│   ├── getCurrentYear.js
│   ├── getEarliestTimestamp.js
│   ├── getInterpretedDateRangeFromOneDate.js
│   ├── getInterpretedDateRangeFromTwoDates.js
│   ├── getInterpretedTimestampFromYMD.js
│   ├── getYMDHMSFromTimestamp.js
│   ├── getYYYYMMDDFromTimestamp.js
│   └── index.js
├── endpointFactory
│   ├── client.js
│   ├── createEndpointFactory.js
│   ├── server.js
│   └── utilities
│       ├── buildOperationIdPathnameMap.js
│       ├── createBodyValidator.js
│       ├── createGetExample.js
│       ├── createMapQueryParams.js
│       ├── createMapQueryParams.test.js
│       ├── createMock.js
│       ├── createQueryParamValidator.js
│       ├── createResponseValidator.js
│       ├── getExamplesFromMethodSpecifiction.js
│       ├── getModelNameFromSchema.js
│       ├── getSchemaFromRequestBody.js
│       └── getSchemaFromResponse.js
├── env
│   ├── createEnvReader.js
│   ├── createEnvReader.test.js
│   ├── ensureNodeEnv.js
│   ├── getEnvFilePath.js
│   ├── resolveEnvVariable.js
│   ├── resolveEnvVariable.test.js
│   ├── resolveEnvVariables.js
│   └── resolveEnvVariables.test.js
├── error
│   ├── constants
│   │   ├── errorCodes.js
│   │   ├── errorCodes.spec.js
│   │   ├── errorStatus.js
│   │   ├── errorStatus.spec.js
│   │   └── parameterErrorCodes.js
│   ├── constants-not-used.js
│   ├── errorFactories
│   │   ├── backendError.js
│   │   ├── backendError400.js
│   │   ├── backendError403.js
│   │   ├── backendError404.js
│   │   ├── backendError500.js
│   │   ├── createParameterErrorsFromAjv
│   │   │   ├── decorateAdditionalProperties.js
│   │   │   ├── index.js
│   │   │   ├── mapErrors.js
│   │   │   └── transform.js
│   │   ├── frontendError.js
│   │   ├── sanitizeBackendError.js
│   │   └── transformToReduxFormError.js
│   ├── isKnownError.js
│   ├── utilities
│   │   ├── createErrorId.js
│   │   ├── isDinaError.js
│   │   ├── logError.js
│   │   └── transformToReduxFormError.js
│   └── validators
│       ├── coordinates
│       │   └── index.js
│       ├── createBackendApiClientValidator.js
│       ├── createFrontendApiClientValidator.js
│       ├── createSystemBackendValidator.js
│       ├── createSystemFrontendValidator.js
│       ├── customFormValidator.js
│       ├── date
│       │   └── index.js
│       ├── dbValidator.js
│       └── formValidator.js
├── execCmd
│   ├── createFullCmd.js
│   ├── createFullCmd.test.js
│   ├── execCmd.test.js
│   └── index.js
├── findRootPath
│   ├── index.js
│   └── index.test.js
├── formatObject
│   ├── __snapshots__
│   │   ├── coreToNestedSync.test.js.snap
│   │   └── nestedToCoreSync.test.js.snap
│   ├── coreToNested.js
│   ├── coreToNested.test.js
│   ├── coreToNestedSync.js
│   ├── coreToNestedSync.test.js
│   ├── index.js
│   ├── index.test.js
│   ├── nestedToCore.js
│   ├── nestedToCore.test.js
│   ├── nestedToCoreSync.js
│   ├── nestedToCoreSync.test.js
│   ├── normalize
│   │   ├── denormalizeItem.js
│   │   └── normalizeItem.js
│   ├── relationships
│   │   ├── extractItemRelationship.js
│   │   ├── extractItemRelationships.js
│   │   ├── resolveItemRelationship.js
│   │   ├── resolveItemRelationshipSync.js
│   │   ├── resolveItemRelationships.js
│   │   ├── resolveItemRelationshipsSync.js
│   │   └── utilities
│   │       ├── extractArrayRelationship.js
│   │       ├── extractByPath.js
│   │       ├── extractObjectRelationship.js
│   │       ├── getItemByLid.js
│   │       ├── getItemByLid.test.js
│   │       ├── getRelationshipItems.js
│   │       ├── getRelationshipItems.test.js
│   │       ├── getRelationshipItemsSync.js
│   │       ├── getRelationshipItemsSync.test.js
│   │       ├── resolveById.js
│   │       ├── resolveById.test.js
│   │       ├── resolveByPath.js
│   │       ├── resolveByPath.test.js
│   │       ├── resolveRelationshipDataArray.js
│   │       ├── resolveRelationshipDataObject.js
│   │       ├── setExtractedRelationshipData.js
│   │       └── updatePathRelationshipData.js
│   ├── specifications.js
│   ├── todo
│   └── utilities
│       ├── cloneObject.js
│       ├── columnArrayToObject.js
│       ├── columnObjectToArray.js
│       ├── createRelationshipIdMap.js
│       ├── getModelRelationshipPath.js
│       ├── getNextWalkPath.js
│       ├── getNextWalkPath.test.js
│       ├── testData
│       │   ├── corePhysicalObject.js
│       │   ├── coreSpecimen.js
│       │   ├── nestedPhysicalObject.js
│       │   └── nestedSpecimen.js
│       ├── walkObject.js
│       └── walkObject.test.js
├── jsonApiClient
│   ├── get
│   │   ├── createIncludeJobs.js
│   │   ├── fetchIncluded.js
│   │   ├── getMany.js
│   │   ├── getOne.js
│   │   └── runIncludeJobs.js
│   ├── index.js
│   ├── index.test.js
│   ├── modify
│   │   ├── create
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── createWithRelationships
│   │   │   └── index.js
│   │   ├── del
│   │   │   └── index.js
│   │   ├── inverseUpdateRelationship.js
│   │   ├── modifyIncludes
│   │   │   ├── index.js
│   │   │   ├── index.test.js
│   │   │   ├── modifyIncludedRelationship.js
│   │   │   ├── modifyIncludedRelationship.test.js
│   │   │   ├── modifyIncludedRelationshipItem.js
│   │   │   ├── modifyIncludedRelationshipItem.test.js
│   │   │   ├── modifyIncludedRelationshipItems.js
│   │   │   ├── modifyIncludedRelationshipItems.test.js
│   │   │   └── stripRelationshipNotToModify.js
│   │   ├── recursiveCreate.js
│   │   ├── recursiveCreate.test.js
│   │   ├── recursiveUpdate.js
│   │   ├── recursiveUpdate.test.js
│   │   ├── setDependencies.js
│   │   ├── update
│   │   │   ├── index.js
│   │   │   └── index.test.js
│   │   ├── updateRelationship.js
│   │   ├── updateRelationships.js
│   │   └── updateWithRelationships
│   │       └── index.js
│   └── utilities
│       ├── clone.js
│       ├── createOperationSpecificQueryParams.js
│       ├── createRelationSpecification.js
│       ├── createRelationSpecification.test.js
│       ├── getRelativeRelationships.js
│       ├── getRelativeRelationships.test.js
│       ├── shouldModifyInclude.js
│       ├── shouldModifyRelationship.js
│       ├── splitRelationships.js
│       └── splitRelationships.test.js
├── jsonSchema
│   ├── createMockDataFromSchema.js
│   ├── createMockGenerator.js
│   ├── createNormalizedValidator.js
│   ├── createValidator.js
│   ├── createValidatorFactory.js
│   ├── defaultValidatorKeywords.js
│   ├── importJsonFakerSync.js
│   ├── index.js
│   ├── validateAgainstModel.js
│   └── validateAgainstSchema.js
├── log
│   ├── createLogMock.js
│   ├── index.js
│   ├── logFactory.js
│   ├── priorityMap.js
│   └── testLog.js
├── migrator
│   └── index.js
├── openApiClient
│   ├── index.js
│   └── utilities
│       └── createOpenApiMockClient.js
├── promiseForEach
│   └── index.js
├── reporter
│   └── index.js
├── schemaBuilder
│   ├── build
│   │   ├── buildEndpoints
│   │   │   ├── buildEndpoint
│   │   │   └── index.js
│   │   ├── models
│   │   │   └── index.js
│   │   ├── openApi
│   │   │   ├── createOpenApiComponents
│   │   │   ├── createOpenApiInfo.js
│   │   │   ├── createOpenApiPaths
│   │   │   ├── createOpenApiSecurity.js
│   │   │   ├── createOpenApiServers.js
│   │   │   ├── createOpenApiTags.js
│   │   │   └── index.js
│   │   └── utilities
│   │       ├── createModel.js
│   │       ├── interpolate.js
│   │       ├── normalizeModel.js
│   │       ├── setupRefs.js
│   │       ├── setupRelationships.js
│   │       └── splitDescription.js
│   ├── buildModels.js
│   ├── buildOpenApi.js
│   ├── buildTests
│   │   ├── openApi
│   │   │   └── index.test.js
│   │   ├── schemas
│   │   │   ├── openApi.json
│   │   │   └── swagger.json
│   │   └── testImports.test.js
│   ├── ensureVersionLocked.js
│   ├── lockVersion.js
│   ├── openApi.spec.js
│   ├── read
│   │   ├── index.js
│   │   ├── readApis.js
│   │   ├── readEndpoints.js
│   │   ├── readErrors.js
│   │   ├── readInfo.js
│   │   ├── readModels.js
│   │   ├── readParameters.js
│   │   ├── readSecurity.js
│   │   ├── readServers.js
│   │   └── utilities
│   │       ├── mergeModelsAndModelConfigurations.js
│   │       ├── readJsonFromDirectory.js
│   │       ├── readParameterFromJsonFile.js
│   │       └── readParameterFromMarkdownFile.js
│   ├── schemas
│   │   ├── endpoint.json
│   │   ├── openApi.json
│   │   └── swagger.json
│   └── write
│       └── index.js
├── schemaInterface
│   ├── createSchemaInterface
│   │   ├── index.js
│   │   └── index.test.js
│   ├── index.js
│   ├── loadVersionSet.js
│   ├── normalize
│   │   ├── createKeyColumnMap.js
│   │   ├── createModelKeyColumnMap.js
│   │   ├── createNormalizeSpecification.js
│   │   ├── createNormalizeSpecifications.js
│   │   ├── index.js
│   │   └── utilities
│   │       ├── getModelColumn.js
│   │       ├── getModelFormat.js
│   │       ├── getModelIsColumn.js
│   │       ├── getModelType.js
│   │       ├── normalizrGetIdAttribute.js
│   │       └── normalizrProcessStrategy.js
│   ├── openApi
│   │   ├── getMethodByOperationId.js
│   │   └── index.js
│   ├── relationships
│   │   ├── index.js
│   │   ├── index.test.js
│   │   ├── modelsSelectors.js
│   │   ├── modelsSelectors.test.js
│   │   ├── relationshipsSchemaSelectors.js
│   │   └── relationshipsSchemaSelectors.test.js
│   └── singletons.js
├── scripts
│   └── buildFileStructureTrees.js
├── search
│   ├── filter
│   │   ├── async
│   │   │   └── index.js
│   │   ├── includeItem
│   │   │   └── index.js
│   │   └── sync
│   │       └── index.js
│   ├── map
│   │   └── sync
│   │       └── index.js
│   └── resources
│       ├── shared
│       │   └── filterFunctions
│       └── specimen
│           ├── filterFunctions
│           ├── index.js
│           ├── mapFunctions
│           └── testData
├── storage
│   └── extractNameWithFirstLevelParent.js
├── stringFormatters
│   ├── camelCaseToUpperSnakeCase
│   │   ├── index.js
│   │   └── index.test.js
│   ├── capitalizeFirstLetter
│   │   ├── index.js
│   │   └── index.test.js
│   ├── capitalizeFirstLetterOfEachWord
│   │   └── index.js
│   ├── index.js
│   └── index.test.js
├── testUtilities
│   ├── describeInEnv.js
│   ├── envBackendApi.js
│   ├── envBackendApiSampleData.js
│   ├── envBackendDb.js
│   ├── envUnit.js
│   ├── envUnitSlow.js
│   ├── expectNoValidationError.js
│   ├── hookInEnv.js
│   └── shouldRunWithCurrentEnv.js
└── tree.md

```