import React from 'react'
import PropTypes from 'prop-types'
import RangeDate from '../RangeDate'

const propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  meta: PropTypes.object.isRequired,
  module: PropTypes.string.isRequired,
}

const SingleDate = ({ input, meta, module, ...rest }) => {
  return (
    <RangeDate
      displayDateTypeRadios={false}
      displayLabel
      displaySubLabels
      initialDateType="single"
      input={input}
      meta={meta}
      module={module}
      name={input.name}
      {...rest}
    />
  )
}

SingleDate.propTypes = propTypes

export default SingleDate
