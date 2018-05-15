import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Form, Grid } from 'semantic-ui-react'
import {
  arrayPush,
  arrayUnshift,
  arrayRemove,
  change,
  formValueSelector as formValueSelectorFactory,
  reduxForm,
} from 'redux-form'

import createLog from 'utilities/log'
import customFormValidator from 'common/es5/error/validators/customFormValidator'
import { Field } from 'coreModules/form/components'
import TaxonSearchInputWithResults from 'domainModules/taxon/components/TaxonSearchInputWithResults'
import { taxonFormModels } from '../../../../../schemas'
import {
  ACCEPTED,
  ADD_SYNONYM,
  ADD_VERNACULAR_NAME,
  DISCONNECT_TAXON_NAME,
  SET_TAXON_NAME_AS_ACCEPTED,
  SET_TAXON_NAME_AS_SYNONYM,
  SYNONYM,
  VERNACULAR,
} from '../../../../../constants'
import { createSortedNameList } from '../../../../../utilities'
import FormActions from './FormActions'
import TaxonNameTable from '../../shared/TaxonNameTable'

export const FORM_NAME = 'taxon'

const log = createLog('modules:taxon:taxon:BaseForm')

const formValueSelector = formValueSelectorFactory(FORM_NAME)

const mapStateToProps = state => {
  const acceptedTaxonName = formValueSelector(state, 'acceptedTaxonName')
  const synonyms = formValueSelector(state, 'synonyms')
  const vernacularNames = formValueSelector(state, 'vernacularNames')
  const sortedNameList = createSortedNameList({
    acceptedTaxonName,
    synonyms,
    vernacularNames,
  })
  return {
    acceptedTaxonName,
    sortedNameList,
  }
}

const mapDispatchToProps = {
  arrayPush,
  arrayRemove,
  arrayUnshift,
  change,
}

const propTypes = {
  acceptedTaxonName: PropTypes.object,
  arrayPush: PropTypes.func.isRequired,
  arrayRemove: PropTypes.func.isRequired,
  arrayUnshift: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  displayBackButton: PropTypes.bool,
  displayResetButton: PropTypes.bool,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onInteraction: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  sortedNameList: PropTypes.array.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

const defaultProps = {
  acceptedTaxonName: null,
  displayBackButton: false,
  displayResetButton: false,
  error: '',
}

export class BaseForm extends Component {
  constructor(props) {
    super(props)
    this.handleInteraction = this.handleInteraction.bind(this)
    this.setTaxonNameAsAccepted = this.setTaxonNameAsAccepted.bind(this)
    this.disconnectTaxonName = this.disconnectTaxonName.bind(this)
    this.addSynonym = this.addSynonym.bind(this)
    this.addVernacularName = this.addVernacularName.bind(this)
  }

  setTaxonNameAsAccepted({ itemId, nameType, stateIndex } = {}) {
    const currentAcceptedName = this.props.acceptedTaxonName

    this.disconnectTaxonName({
      itemId,
      nameType,
      stateIndex,
    })

    if (currentAcceptedName && currentAcceptedName.id) {
      this.setTaxonNameAsSynonyme({
        itemId: currentAcceptedName.id,
        nameType: ACCEPTED,
      })
    }

    return this.props.change(FORM_NAME, 'acceptedTaxonName', {
      id: itemId,
    })
  }

  setTaxonNameAsSynonyme({ itemId, nameType } = {}) {
    this.addSynonym({
      itemId,
      unshift: nameType === ACCEPTED,
    })
    return null
  }

  addSynonym({ itemId, unshift = false } = {}) {
    this.disconnectTaxonName({
      itemId,
    })
    if (unshift) {
      return this.props.arrayUnshift(FORM_NAME, 'synonyms', {
        id: itemId,
      })
    }

    return this.props.arrayPush(FORM_NAME, 'synonyms', {
      id: itemId,
    })
  }

  addVernacularName({ itemId } = {}) {
    this.disconnectTaxonName({
      itemId,
    })
    return this.props.arrayPush(FORM_NAME, 'vernacularNames', {
      id: itemId,
    })
  }

  disconnectTaxonName({ itemId } = {}) {
    const existinTaxonNameListItem = this.props.sortedNameList.find(
      ({ id }) => {
        return id === itemId
      }
    )
    if (!existinTaxonNameListItem) {
      return null
    }

    const { nameType, stateIndex } = existinTaxonNameListItem

    if (nameType === SYNONYM) {
      this.props.arrayRemove(FORM_NAME, 'synonyms', stateIndex)
    }
    if (nameType === VERNACULAR) {
      this.props.arrayRemove(FORM_NAME, 'vernacularNames', stateIndex)
    }
    if (nameType === ACCEPTED) {
      this.props.change(FORM_NAME, 'acceptedTaxonName', null)
    }
    return null
  }

  handleInteraction(interactionType, { itemId, nameType, stateIndex } = {}) {
    if (interactionType === ADD_SYNONYM) {
      return this.addSynonym({
        itemId,
      })
    }
    if (interactionType === ADD_VERNACULAR_NAME) {
      return this.addVernacularName({
        itemId,
      })
    }
    if (interactionType === DISCONNECT_TAXON_NAME) {
      return this.disconnectTaxonName({
        itemId,
        nameType,
        stateIndex,
      })
    }
    if (interactionType === SET_TAXON_NAME_AS_ACCEPTED) {
      return this.setTaxonNameAsAccepted({
        itemId,
        nameType,
        stateIndex,
      })
    }
    if (interactionType === SET_TAXON_NAME_AS_SYNONYM) {
      return this.setTaxonNameAsSynonyme({
        itemId,
        nameType,
        stateIndex,
      })
    }
    return this.props.onInteraction(interactionType, {
      itemId,
      nameType,
      stateIndex,
    })
  }
  render() {
    log.render()
    const {
      displayBackButton,
      displayResetButton,
      error,
      handleSubmit,
      invalid,
      onClose,
      pristine,
      reset,
      sortedNameList,
      submitFailed,
      submitSucceeded,
      submitting,
    } = this.props

    return (
      <Form error={!!error} onSubmit={handleSubmit(this.props.onSubmit)}>
        <Grid textAlign="left" verticalAlign="top">
          <Grid.Row>
            <Grid.Column>
              <Field
                autoComplete="off"
                component={TaxonSearchInputWithResults}
                label="Parent"
                module="taxon"
                name="parent.id"
              />
            </Grid.Column>
            <Grid.Column width={16}>
              <TaxonNameTable
                edit
                onInteraction={this.handleInteraction}
                sortedNameList={sortedNameList}
              />
            </Grid.Column>
          </Grid.Row>

          <FormActions
            displayBackButton={displayBackButton}
            displayResetButton={displayResetButton}
            error={error}
            invalid={invalid}
            onClose={onClose}
            pristine={pristine}
            reset={reset}
            submitFailed={submitFailed}
            submitSucceeded={submitSucceeded}
            submitting={submitting}
          />
        </Grid>
      </Form>
    )
  }
}

BaseForm.propTypes = propTypes
BaseForm.defaultProps = defaultProps

export default compose(
  reduxForm({
    destroyOnUnmount: false, // to keep values when switching layout
    enableReinitialize: true,
    form: FORM_NAME,
    validate: customFormValidator({
      model: 'taxon',
      models: taxonFormModels,
    }),
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(BaseForm)
