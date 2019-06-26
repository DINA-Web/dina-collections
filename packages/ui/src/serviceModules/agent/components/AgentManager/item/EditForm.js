import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { formValueSelector as formValueSelectorFactory } from 'redux-form'

import globalCrudSelectors from 'coreModules/crud/globalSelectors'
import { getChildrenIds, getParentId } from 'coreModules/crud/utilities'

import BaseForm from './BaseForm'

const FORM_NAME = 'normalizedAgentEdit'

const mapStateToProps = (state, ownProps) => {
  const { item: normalizedAgent } = ownProps
  const parentId = getParentId(normalizedAgent)
  const parent =
    parentId && globalCrudSelectors.normalizedAgent.getOne(state, parentId)
  const children = getChildrenIds(normalizedAgent).map(id => {
    return (
      globalCrudSelectors.normalizedAgent.getOne(state, id) || {
        id,
      }
    )
  })

  return {
    children,
    parent,
  }
}

export const include = ['resourceActivities']

const propTypes = {
  nestedItem: PropTypes.object,
}

const defaultProps = {
  nestedItem: undefined,
}

export class Edit extends PureComponent {
  constructor(props) {
    super(props)
    this.formValueSelector = formValueSelectorFactory(FORM_NAME)
  }

  render() {
    const { nestedItem, ...rest } = this.props

    if (!nestedItem) {
      return null
    }

    const { resourceActivities } = nestedItem

    return (
      <BaseForm
        {...rest}
        displayBackButton
        displayResetButton
        form={FORM_NAME}
        formValueSelector={this.formValueSelector}
        initialValues={nestedItem}
        onClose={event => {
          event.preventDefault()
        }}
        resourceActivities={resourceActivities}
      />
    )
  }
}

Edit.propTypes = propTypes
Edit.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(Edit)
