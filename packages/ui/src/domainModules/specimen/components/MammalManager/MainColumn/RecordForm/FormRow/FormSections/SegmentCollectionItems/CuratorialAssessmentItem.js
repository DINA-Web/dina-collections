import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Grid, List, Modal } from 'semantic-ui-react'

import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { DateString } from 'coreModules/commonUi/components'
import { FormModal } from 'coreModules/form/components'
import EditCuratorialAssessment from './CuratorialAssessmentForm/Edit'

const ModuleTranslate = createModuleTranslate('specimen')

const propTypes = {
  agent: PropTypes.shape({
    normalized: { id: PropTypes.string },
    textI: PropTypes.string,
  }),
  changeFieldValue: PropTypes.func.isRequired,
  condition: PropTypes.string,
  conditionRemarks: PropTypes.string,
  date: PropTypes.object,
  getPath: PropTypes.func.isRequired,
  inventoryStatusRemarks: PropTypes.string,
  isInStorage: PropTypes.bool,
  normalizedAgent: PropTypes.shape({
    attributes: PropTypes.shape({
      fullName: PropTypes.string,
    }),
    id: PropTypes.string.isRequired,
  }),
  removeArrayFieldByIndex: PropTypes.func.isRequired,
}
const defaultProps = {
  agent: undefined,
  condition: undefined,
  conditionRemarks: undefined,
  date: undefined,
  inventoryStatusRemarks: undefined,
  isInStorage: undefined,
  normalizedAgent: undefined,
}

class CuratorialAssessmentItem extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)

    this.state = {
      open: false,
    }
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleOpen() {
    this.setState({ open: true })
  }

  render() {
    const {
      agent,
      date,
      condition,
      conditionRemarks,
      changeFieldValue,
      getPath,
      inventoryStatusRemarks,
      isInStorage,
      normalizedAgent,
      removeArrayFieldByIndex,
    } = this.props

    const { open } = this.state

    return (
      <List.Item>
        <List.Content style={{ padding: '0.5em' }} verticalAlign="bottom">
          <FormModal
            open={open}
            size="small"
            trigger={
              /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
              !open && (
                <Grid
                  onClick={this.handleOpen}
                  style={{ cursor: 'pointer' }}
                  textAlign="left"
                >
                  <Grid.Row>
                    <Grid.Column computer={2} mobile={4} tablet={4}>
                      {date && <DateString {...date} />}
                    </Grid.Column>
                    <Grid.Column computer={3} mobile={6} tablet={6}>
                      {(normalizedAgent &&
                        normalizedAgent.attributes &&
                        normalizedAgent.attributes.fullName) ||
                        (agent && agent.textI)}
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={8}>
                      {isInStorage !== undefined &&
                        (isInStorage ? 'In storage' : 'Not found')}
                      {inventoryStatusRemarks && (
                        <em>{`. ${inventoryStatusRemarks}`}</em>
                      )}
                    </Grid.Column>
                    <Grid.Column computer={6} mobile={16} tablet={8}>
                      {condition}
                      {conditionRemarks && <em>{`. ${conditionRemarks}`}</em>}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              )
              /* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
            }
          >
            <Modal.Header>
              <ModuleTranslate textKey="headers.editCuratorialAssessment" />
            </Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <EditCuratorialAssessment
                  agent={agent}
                  changeFieldValue={changeFieldValue}
                  condition={condition}
                  conditionRemarks={conditionRemarks}
                  date={date}
                  fieldName={getPath()}
                  inventoryStatusRemarks={inventoryStatusRemarks}
                  isInStorage={isInStorage}
                  onClose={this.handleClose}
                  removeArrayFieldByIndex={removeArrayFieldByIndex}
                />
              </Modal.Description>
            </Modal.Content>
          </FormModal>
        </List.Content>
      </List.Item>
    )
  }
}

CuratorialAssessmentItem.propTypes = propTypes
CuratorialAssessmentItem.defaultProps = defaultProps

export default compose(
  createGetItemById({
    idPath: 'agent.normalized.id',
    itemKey: 'normalizedAgent',
    resource: 'normalizedAgent',
  }),
  pathBuilder()
)(CuratorialAssessmentItem)
