import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button, Grid, Segment } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { Checkbox, DropdownSearch, Field } from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import CatalogNumberInput from './CatalogNumberInput'
import IdentifiersTable from './IdentifiersTable'

const log = createLog('modules:collectionMammals:MammalForm:SegmentIdentifiers')

const ModuleTranslate = createModuleTranslate('collectionMammals', {
  scope: 'identifiers',
})

const TYPE_SPECIMEN_OPTIONS = [
  'holotype',
  'lectotype',
  'neotype',
  'paralectotype',
  'paratype',
  'syntype',
  'type',
].map(value => {
  return {
    key: value,
    text: value,
    value,
  }
})

const mapStateToProps = (state, { formValueSelector }) => {
  return {
    identifiers: formValueSelector(state, 'identifiers'),
  }
}

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  formValueSelector: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
  identifiers: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
}

class SegmentIdentifiers extends PureComponent {
  render() {
    const {
      changeFieldValue,
      editMode,
      formValueSelector,
      getPath,
      identifiers,
      removeArrayFieldByIndex,
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
                helpText={<ModuleTranslate textKey="sixOrEightDigits" />}
                label={<ModuleTranslate textKey="catalogNumber" />}
                module="collectionMammals"
                name={getPath('0.value')}
                type="text"
              />
            </Grid.Column>
            <Grid.Column computer={4} mobile={16} tablet={4}>
              <Field
                autoComplete="off"
                component={Checkbox}
                label={<ModuleTranslate textKey="isPublic" />}
                module="collectionMammals"
                name={getPath('0.publishRecord')}
                type="checkbox"
              />
            </Grid.Column>
            <Grid.Column computer={8} mobile={16} tablet={8}>
              <Field
                autoComplete="off"
                className="transparent"
                component={DropdownSearch}
                label={<ModuleTranslate textKey="typeStatus" />}
                module="collectionMammals"
                name="typeStatus"
                options={TYPE_SPECIMEN_OPTIONS}
                type="dropdown-search-local"
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
                <ModuleTranslate textKey="addIdentifier" />
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
  pathBuilder({ name: 'identifiers' })
)(SegmentIdentifiers)
