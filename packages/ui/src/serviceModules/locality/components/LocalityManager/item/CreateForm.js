import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { ModuleTranslate } from 'coreModules/i18n/components'
import BaseForm from './BaseForm'

const propTypes = {
  itemId: PropTypes.string,
}
const defaultProps = {
  itemId: undefined,
}

const getAllowTransition = (location, action) => {
  if (action === 'POP') {
    return false
  }
  return location.search.includes('mainColumn=edit')
}

export class Create extends PureComponent {
  render() {
    const { itemId, ...rest } = this.props
    const initialValues = itemId ? { parent: { id: itemId } } : {}

    return (
      <BaseForm
        {...rest}
        displayBackButton
        displayResetButton
        form="placeCreate"
        getAllowTransition={getAllowTransition}
        initialValues={initialValues}
        itemHeader={
          <ModuleTranslate capitalize module="locality" textKey="newLocality" />
        }
        onClose={event => {
          event.preventDefault()
        }}
        preventLeavingForm
        unsavedChangesMessage="You have not saved the new record, are you sure you want to leave?"
      />
    )
  }
}

Create.propTypes = propTypes
Create.defaultProps = defaultProps

export default Create
