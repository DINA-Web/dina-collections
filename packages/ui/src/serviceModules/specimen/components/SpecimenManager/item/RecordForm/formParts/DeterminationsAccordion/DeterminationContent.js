import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Button, Grid } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import {
  ConfirmationPopup,
  Field,
  Input,
  Remarks,
  SingleDate,
} from 'coreModules/form/components'

import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { TogglableAgentDropdownPickerSearch } from 'serviceModules/agent/components'

const log = createLog(
  'modules:specimen:MammalManager/MainColumn/RecordForm/formParts/DeterminationsAccordion/DeterminationContent'
)

const propTypes = {
  getPath: PropTypes.func.isRequired,
  getTranslationPath: PropTypes.func.isRequired,
  handleSetInactive: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
  skipRemoveDeterminationConfirmation: PropTypes.bool.isRequired,
}

class DeterminationContent extends Component {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove() {
    const {
      getTranslationPath,
      handleSetInactive,
      index,
      removeArrayFieldByIndex,
    } = this.props
    handleSetInactive(index)
    removeArrayFieldByIndex(getTranslationPath(), index)
  }

  render() {
    const {
      getPath,
      getTranslationPath,
      handleSetInactive,
      i18n: { moduleTranslate },
      index,
      removeArrayFieldByIndex,
      skipRemoveDeterminationConfirmation,
    } = this.props

    log.render()
    return (
      <Grid textAlign="left" verticalAlign="bottom">
        <Grid.Row className="relaxed">
          <Grid.Column width={8}>
            <Field
              autoComplete="off"
              component={Input}
              fluid
              module="specimen"
              name={getPath('taxonNameV')}
              type="text"
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <Field
              autoComplete="off"
              component={Input}
              fluid
              module="specimen"
              name={getPath('taxonNameI')}
              type="text"
            />
          </Grid.Column>
          <Grid.Column width={7}>
            <Field
              autoComplete="off"
              component={Input}
              fluid
              model="determinations"
              module="specimen"
              name={getPath('determinedByAgent.textV')}
              type="text"
            />
          </Grid.Column>
          <Grid.Column width={9}>
            <Field
              autoComplete="off"
              buttonTextKey="other.interpretThisName"
              component={TogglableAgentDropdownPickerSearch}
              displayEmptyStateLabel={false}
              displayResultLabel={false}
              module="specimen"
              name={getPath('determinedByAgent')}
            />
          </Grid.Column>
          <Grid.Column width={16}>
            <Field
              autoComplete="off"
              component={SingleDate}
              module="specimen"
              name={getPath('date')}
              parameterKey="determinations.date"
            />
          </Grid.Column>
          <Grid.Column width={16}>
            <Field
              autoComplete="off"
              component={Remarks}
              emptyStateTextKey="remarks.emptyState.determination"
              model="determination"
              module="specimen"
              name={getPath('remarks')}
            />
          </Grid.Column>
          <Grid.Column textAlign="right" width={16}>
            {skipRemoveDeterminationConfirmation && (
              <Button
                basic
                onClick={event => {
                  event.preventDefault()
                  handleSetInactive(index)
                  removeArrayFieldByIndex(getTranslationPath(), index)
                }}
                type="button"
              >
                {moduleTranslate({ capitalize: true, textKey: 'other.remove' })}
              </Button>
            )}
            {!skipRemoveDeterminationConfirmation && (
              <ConfirmationPopup
                cancelButtonText={moduleTranslate({
                  capitalize: true,
                  textKey: 'other.cancel',
                })}
                confirmButtonText={moduleTranslate({
                  capitalize: true,
                  textKey: 'other.remove',
                })}
                header={moduleTranslate({
                  capitalize: true,
                  textKey: 'other.removeThisDetermination',
                })}
                hideOnScroll
                onConfirm={this.handleRemove}
                text={moduleTranslate({
                  capitalize: true,
                  textKey: 'other.deleteDetermination',
                })}
              />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

DeterminationContent.propTypes = propTypes

export default compose(
  withI18n({ module: 'specimen' }),
  pathBuilder()
)(DeterminationContent)
