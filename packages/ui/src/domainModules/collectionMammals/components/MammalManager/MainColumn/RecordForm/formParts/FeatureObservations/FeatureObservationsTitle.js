import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { ModuleTranslate } from 'coreModules/i18n/components'

const log = createLog(
  'modules:collectionMammals:MammalForm:FeatureObservations:FeatureObservationsTitle'
)

const propTypes = {
  headlineKey: PropTypes.string.isRequired,
}

function FeatureObservationsTitle({ headlineKey }) {
  log.render()
  return (
    <React.Fragment>
      <Icon name="dropdown" />
      <ModuleTranslate
        module="specimen"
        scope="enums.featureObservations"
        textKey={headlineKey}
      />
    </React.Fragment>
  )
}

FeatureObservationsTitle.propTypes = propTypes

export default FeatureObservationsTitle
