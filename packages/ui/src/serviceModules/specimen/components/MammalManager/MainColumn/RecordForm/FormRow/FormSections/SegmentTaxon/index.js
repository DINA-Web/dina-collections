import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import config from 'config'
import createLog from 'utilities/log'
import { Accordion } from 'coreModules/commonUi/components'
import { FIRST_EXPANDED } from 'coreModules/commonUi/constants'
import { createModuleTranslate } from 'coreModules/i18n/components'
import sizeSelectors from 'coreModules/size/globalSelectors'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import crudSelectors from 'coreModules/crud/globalSelectors'
import { TaxonNameDropdownSearch } from 'serviceModules/taxon/components'
import { CustomData, Field, Input, Remarks } from 'coreModules/form/components'
import DeterminationContent from './DeterminationContent'
import DeterminationTitle from './DeterminationTitle'

const log = createLog(
  'modules:specimen:MammalForm:SegmentDeterminations'
)

const ModuleTranslate = createModuleTranslate('specimen')

const mapStateToProps = (state, { formValueSelector, specimenId }) => {
  return {
    determinations: formValueSelector(state, 'individual.determinations'),
    hasSpecimen: !!(
      specimenId && crudSelectors.specimen.getOne(state, specimenId)
    ),
    isSmallScreen: sizeSelectors.getIsSmall(state),
    taxonInformation: formValueSelector(state, 'individual.taxonInformation'),
  }
}

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  determinations: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.object,
      determinedByAgentText: PropTypes.string,
      remarks: PropTypes.string,
      taxonNameStandardized: PropTypes.string,
    })
  ).isRequired,
  editMode: PropTypes.bool.isRequired,
  formValueSelector: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
  hasSpecimen: PropTypes.bool.isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
  taxonInformation: PropTypes.shape({
    curatorialTaxonNameText: PropTypes.string,
  }),
}
const defaultProps = {
  taxonInformation: {},
}

const SegmentDeterminations = ({
  changeFieldValue,
  determinations,
  editMode,
  formValueSelector,
  getPath,
  hasSpecimen,
  isSmallScreen,
  removeArrayFieldByIndex,
}) => {
  const renderAccordion = !editMode || (editMode && hasSpecimen)

  log.render()
  return (
    <Segment color="green" loading={!renderAccordion}>
      <Header size="medium">
        <ModuleTranslate capitalize textKey="headers.taxon" />
      </Header>

      <Grid textAlign="left" verticalAlign="top">
        <Grid.Row>
          <Grid.Column computer={6} mobile={16} tablet={5}>
            <Field
              autoComplete="off"
              component={TaxonNameDropdownSearch}
              module="specimen"
              name="individual.taxonInformation.curatorialTaxonName.id"
              type="text"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={4} mobile={16} tablet={8}>
            <Field
              autoComplete="off"
              component={Input}
              module="specimen"
              name={getPath(
                'individual.taxonInformation.curatorialTaxonNameText'
              )}
              type="text"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={5} mobile={16} tablet={8}>
            <Field
              autoComplete="off"
              component={Remarks}
              module="specimen"
              name={getPath('individual.taxonInformation.taxonRemarks')}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column mobile={16}>
            <Header size="medium">
              <ModuleTranslate capitalize textKey="headers.determinations" />
            </Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Column mobile={16}>
          {renderAccordion && (
            <Accordion
              initialActiveMode={FIRST_EXPANDED}
              items={determinations}
              renderContent={props => (
                <DeterminationContent
                  changeFieldValue={changeFieldValue}
                  formValueSelector={formValueSelector}
                  isSmallScreen={isSmallScreen}
                  removeArrayFieldByIndex={removeArrayFieldByIndex}
                  skipRemoveDeterminationConfirmation={config.isTest}
                  {...props}
                />
              )}
              renderTitle={({ index, ...rest }) => (
                <DeterminationTitle
                  {...determinations[index] || {}}
                  {...rest}
                />
              )}
              skipRemoveDeterminationConfirmation={config.isTest}
            />
          )}
        </Grid.Column>
        <Grid.Column mobile={16}>
          <Button
            id="add-determination"
            onClick={event => {
              event.preventDefault()
              changeFieldValue(
                `individual.determinations.${determinations.length}`,
                {}
              )
            }}
          >
            <ModuleTranslate
              scope="determination"
              textKey="other.addDetermination"
            />
          </Button>
        </Grid.Column>
        <Grid.Row>
          <Grid.Column computer={6} mobile={16} tablet={8}>
            <Field
              autoComplete="off"
              component={CustomData}
              module="specimen"
              name={getPath('individual.taxonInformation.readOnly')}
              type="read-only"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

SegmentDeterminations.propTypes = propTypes
SegmentDeterminations.defaultProps = defaultProps

export default compose(
  connect(mapStateToProps),
  pathBuilder()
)(SegmentDeterminations)
