import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import createModelLink from '../../utilities/createModelLink'
import getPropertyIsArray from '../../utilities/getPropertyIsArray'
import getPropertyIsModel from '../../utilities/getPropertyIsModel'
import getPropertyIsAnyOf from '../../utilities/getPropertyIsAnyOf'
import getAnyOfLinksFromProperty from '../../utilities/getAnyOfLinksFromProperty'
import getArrayLinkFromProperty from '../../utilities/getArrayLinkFromProperty'
import getModelLinkFromProperty from '../../utilities/getModelLinkFromProperty'

const propTypes = {
  property: PropTypes.object.isRequired,
  version: PropTypes.string.isRequired,
}

const Type = ({ property, version }) => {
  if (getPropertyIsAnyOf(property)) {
    return getAnyOfLinksFromProperty({
      property,
      Type,
      version,
    })
  }

  if (getPropertyIsArray(property)) {
    const to = createModelLink({
      modelName: getArrayLinkFromProperty(property),
      version,
    })
    return (
      <Link className="item" href={to} to={to}>
        {`<ARRAY> ${getArrayLinkFromProperty(property)}`}
      </Link>
    )
  }

  if (getPropertyIsModel(property)) {
    const to = createModelLink({
      modelName: getModelLinkFromProperty(property),
      version,
    })
    return (
      <Link className="item" href={to} to={to}>
        {`<MODEL> ${getModelLinkFromProperty(property)}`}
      </Link>
    )
  }

  const type = property.type || ''

  if (!property.enum) {
    return type.toUpperCase()
  }

  return `${type.toUpperCase()}, enum: [${property.enum.join(', ')}]`
}

Type.propTypes = propTypes

export default Type
