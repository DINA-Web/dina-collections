import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import crudActionCreators from 'coreModules/crud/actionCreators'
import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import BaseForm from './BaseForm'

const mapDispatchToProps = {
  updatePlace: crudActionCreators.place.update,
}

const propTypes = {
  itemId: PropTypes.string.isRequired,
  nestedItem: PropTypes.object,
  onInteraction: PropTypes.func.isRequired,
  updatePlace: PropTypes.func.isRequired,
}

const defaultProps = {
  nestedItem: undefined,
}

export class Edit extends PureComponent {
  render() {
    const { nestedItem: initialValues, onInteraction, itemId } = this.props

    if (!initialValues) {
      return null
    }

    return (
      <React.Fragment>
        <BaseForm
          displayBackButton
          displayResetButton
          form="taxonNameEdit"
          initialValues={initialValues}
          onClose={event => {
            event.preventDefault()
            onInteraction('FORM_CANCEL')
          }}
          onInteraction={onInteraction}
          onSubmit={formOutput => {
            this.props
              .updatePlace({
                item: {
                  id: itemId,
                  ...formOutput,
                },
                nested: true,
              })
              .then(result => {
                onInteraction('FORM_EDIT_SUCCESS', {
                  itemId: result.id,
                })
              })
          }}
        />
      </React.Fragment>
    )
  }
}

Edit.propTypes = propTypes
Edit.defaultProps = defaultProps

export default compose(
  createGetNestedItemById({
    nestedItemKey: 'taxonName',
    resource: 'taxonName',
  }),
  connect(null, mapDispatchToProps)
)(Edit)
