import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  getFormSyncErrors,
  isInvalid,
  isPristine,
  isSubmitting,
} from 'redux-form'
import { Button, Grid } from 'semantic-ui-react'

import config from 'config'
import { ConnectedFormSchemaError } from 'coreModules/error/components'
import { createModuleTranslate } from 'coreModules/i18n/components'
import DeleteRecordButton from './DeleteRecordButton'

const ModuleTranslate = createModuleTranslate('form')

const hasError = (syncErrors = {}) => {
  if (syncErrors.schemaErrors && syncErrors.schemaErrors.length) {
    return true
  }

  const errors = { ...syncErrors }

  delete errors.schemaErrors

  return Object.keys(errors).length > 0
}

const textStyle = { float: 'left', marginLeft: '1.25em', marginTop: '0.625em' }

const mapStateToProps = (state, { formName }) => {
  return {
    hasSyncErrors: hasError(getFormSyncErrors(formName)(state)),
    invalid: isInvalid(formName)(state),
    pristine: isPristine(formName)(state),
    submitting: isSubmitting(formName)(state),
  }
}

const propTypes = {
  cancelCreate: PropTypes.func,
  formName: PropTypes.string.isRequired,
  hasSyncErrors: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  loadingDelete: PropTypes.bool,
  nestedItem: PropTypes.object,
  onDelete: PropTypes.func,
  onSubmit: PropTypes.func,
  onUndoChanges: PropTypes.func,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}
const defaultProps = {
  cancelCreate: undefined,
  loadingDelete: undefined,
  nestedItem: undefined,
  onDelete: undefined,
  onSubmit: undefined,
  onUndoChanges: undefined,
}

export class RecordActionBar extends PureComponent {
  render() {
    const {
      formName,
      hasSyncErrors,
      invalid,
      loadingDelete,
      nestedItem,
      cancelCreate: handleCancelCreate,
      onDelete: handleDelete,
      onSubmit: handleSubmit,
      onUndoChanges: handleUndoChanges,
      pristine,
      submitting,
    } = this.props
    const { isRoot } = nestedItem || {}
    const displayChangedMessage = !handleCancelCreate
    return (
      <Grid padded style={{ pointerEvents: 'none' }} verticalAlign="middle">
        <Grid.Column>
          <Button
            data-testid="saveButton"
            disabled={isRoot || hasSyncErrors || invalid || pristine}
            loading={submitting}
            onClick={handleSubmit}
            primary
            size="large"
            style={{ float: 'left', pointerEvents: 'initial' }}
            type="submit"
          >
            <ModuleTranslate textKey="save" />
          </Button>
          {handleCancelCreate && (
            <Button
              basic
              data-testid="cancelCreateButton"
              disabled={!handleCancelCreate || submitting}
              onClick={handleCancelCreate}
              size="large"
              style={{ float: 'left', pointerEvents: 'initial' }}
              type="button"
            >
              Cancel create
            </Button>
          )}
          {!handleCancelCreate && (
            <Button
              basic
              data-testid="undoChangesButton"
              disabled={!handleUndoChanges || pristine || submitting}
              onClick={handleUndoChanges}
              size="large"
              style={{ float: 'left', pointerEvents: 'initial' }}
              type="button"
            >
              Undo changes
            </Button>
          )}

          {isRoot && (
            <em style={textStyle}>
              <ModuleTranslate textKey="notAllowedToEditRootNode" />
            </em>
          )}
          {!isRoot &&
            !pristine &&
            (hasSyncErrors || invalid ? (
              <em style={textStyle}>
                <ModuleTranslate textKey="issuesPreventSaving" />
              </em>
            ) : (
              displayChangedMessage && (
                <em style={textStyle}>Unsaved changes</em>
              )
            ))}
          {config.isDevelopment && <ConnectedFormSchemaError form={formName} />}
          {handleDelete && (
            <DeleteRecordButton
              loading={loadingDelete}
              onDelete={handleDelete}
            />
          )}
        </Grid.Column>
      </Grid>
    )
  }
}

RecordActionBar.propTypes = propTypes
RecordActionBar.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(RecordActionBar)
