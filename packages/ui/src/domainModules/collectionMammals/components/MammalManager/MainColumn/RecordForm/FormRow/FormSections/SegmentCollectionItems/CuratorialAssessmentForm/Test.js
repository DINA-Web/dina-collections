import React from 'react'
import PropTypes from 'prop-types'

import { Field, Input } from 'coreModules/form/components'

const propTypes = {
  getPath: PropTypes.func.isRequired,
  index: PropTypes.number,
}
const defaultProps = {
  index: 0,
}

const FieldsForTest = ({ getPath, index }) => {
  return (
    <React.Fragment>
      <Field
        component="input"
        label="Is in storage"
        name={getPath(`${index}.isInStorage`)}
        type="checkbox"
      />
      <Field
        autoComplete="off"
        component={Input}
        label="Remarks"
        module="specimen"
        name={getPath(`${index}.inventoryStatusRemarks`)}
        type="input-text"
      />
      <Field
        autoComplete="off"
        component={Input}
        label="Condition"
        module="specimen"
        name={getPath(`${index}.condition`)}
        type="input-text"
      />
      <Field
        autoComplete="off"
        component={Input}
        label="Condition remarks"
        module="specimen"
        name={getPath(`${index}.conditionRemarks`)}
        type="input-text"
      />
      <Field
        autoComplete="off"
        component={Input}
        label="Date"
        module="specimen"
        name={getPath(`${index}.date.dateText`)}
        type="input-text"
      />
      <Field
        autoComplete="off"
        component={Input}
        label="Agent"
        module="specimen"
        name={getPath(`${index}.agent`)}
        type="input-text"
      />
    </React.Fragment>
  )
}

FieldsForTest.propTypes = propTypes
FieldsForTest.defaultProps = defaultProps

export default FieldsForTest
