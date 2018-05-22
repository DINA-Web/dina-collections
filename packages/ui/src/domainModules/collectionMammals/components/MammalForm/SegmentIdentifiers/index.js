import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button, Grid, Segment } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'
import {
  Checkbox,
  DropdownSearch,
  Input,
  Field,
} from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { createEnsureAllItemsFetched } from 'coreModules/crud/higherOrderComponents'
import globalCrudSelectors from 'coreModules/crud/globalSelectors'
import { AdvancedAgentDropdownSearch } from 'domainModules/agent/components'
import { ALL } from 'domainModules/agent/constants'
import { MAMMAL_FORM_NAME } from '../../../constants'
import CatalogNumberInput from './CatalogNumberInput'
import IdentifiersTable from './IdentifiersTable'

const log = createLog('modules:collectionMammals:MammalForm:SegmentIdentifiers')

const ModuleTranslate = createModuleTranslate('collectionMammals')

const mapStateToProps = (state, { formValueSelector }) => {
  return {
    identifiers: formValueSelector(state, 'individual.identifiers'),
    identifierTypeOptions: globalCrudSelectors.identifierType
      .getAllAsOptions(state)
      .filter(option => {
        return option.text !== 'Catalog number'
      }),
    typeSpecimenTypeOptions: globalCrudSelectors.typeSpecimenType.getAllAsOptions(
      state
    ),
  }
}

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  formValueSelector: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
  identifiers: PropTypes.arrayOf(PropTypes.object).isRequired,
  identifierTypeOptions: PropTypes.array.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
  typeSpecimenTypeOptions: PropTypes.array.isRequired,
}

class SegmentIdentifiers extends PureComponent {
  render() {
    const {
      changeFieldValue,
      editMode,
      formValueSelector,
      getPath,
      identifiers,
      identifierTypeOptions,
      removeArrayFieldByIndex,
      typeSpecimenTypeOptions,
    } = this.props

    log.render()
    return (
      <Segment color="green">
        <Grid textAlign="left" verticalAlign="top">
          <Grid.Row>
            <Grid.Column computer={6} mobile={16} tablet={10}>
              <Field
                autoComplete="off"
                component={CatalogNumberInput}
                editMode={editMode}
                formValueSelector={formValueSelector}
                helpText={<ModuleTranslate textKey="other.sixOrEightDigits" />}
                labelKey="modules.collectionMammals.other.catalogNumber"
                module="collectionMammals"
                name={getPath('0.value')}
                type="text"
              />
            </Grid.Column>
            <Grid.Column computer={4} mobile={16} tablet={4}>
              <Field
                autoComplete="off"
                component={Checkbox}
                model="specimen"
                module="collectionMammals"
                name="publishRecord"
                type="checkbox"
              />
            </Grid.Column>
            <Grid.Column computer={8} mobile={16} tablet={8}>
              <Field
                autoComplete="off"
                className="transparent"
                component={DropdownSearch}
                module="collectionMammals"
                name="individual.typeStatus.id"
                options={typeSpecimenTypeOptions}
                type="dropdown-search-local"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={8} mobile={16} tablet={8}>
              <Field
                autoComplete="off"
                component={Input}
                module="collectionMammals"
                name="individual.collectionItemText"
                type="text"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={4} mobile={16} tablet={8}>
              <Field
                autoComplete="off"
                component={Input}
                module="collectionMammals"
                name="individual.acquisition.acquisitionTypeText"
                type="input-text"
              />
            </Grid.Column>

            <Grid.Column computer={2} mobile={16} tablet={8}>
              <Field
                autoComplete="off"
                component={Input}
                module="collectionMammals"
                name="individual.acquisition.date.dateText"
                parameterKey="acquisition.date"
                type="input-text"
              />
            </Grid.Column>

            <Grid.Column computer={4} mobile={16} tablet={8}>
              <Field
                autoComplete="off"
                component={AdvancedAgentDropdownSearch}
                formName={MAMMAL_FORM_NAME}
                group={ALL}
                initialText="Choose"
                module="collectionMammals"
                name="individual.acquisition.handedInByAgent.id"
              />
            </Grid.Column>
            <Grid.Column computer={4} mobile={16} tablet={8}>
              <Field
                autoComplete="off"
                component={Input}
                module="collectionMammals"
                name="individual.acquisition.handedInByAgentText"
                type="input-text"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            {identifiers &&
              identifiers.length > 1 && (
                <Grid.Column width={16}>
                  <IdentifiersTable
                    changeFieldValue={changeFieldValue}
                    identifiers={identifiers}
                    identifierTypeOptions={identifierTypeOptions}
                    removeArrayFieldByIndex={removeArrayFieldByIndex}
                  />
                </Grid.Column>
              )}
            <Grid.Column width={16}>
              <Button
                id="add-identifier"
                onClick={event => {
                  event.preventDefault()
                  changeFieldValue(getPath(identifiers.length), {})
                }}
              >
                <ModuleTranslate capitalize textKey="other.addIdentifier" />
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

SegmentIdentifiers.propTypes = propTypes

export default compose(
  connect(mapStateToProps),
  createEnsureAllItemsFetched({ resource: 'typeSpecimenType' }),
  createEnsureAllItemsFetched({ resource: 'identifierType' }),
  pathBuilder({ name: 'individual.identifiers' })
)(SegmentIdentifiers)
