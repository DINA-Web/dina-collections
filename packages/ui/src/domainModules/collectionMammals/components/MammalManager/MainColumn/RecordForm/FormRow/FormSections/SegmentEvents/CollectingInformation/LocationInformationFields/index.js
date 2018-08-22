import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { compose } from 'redux'

import { CustomData, Field, Input } from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import FieldWrapper from 'coreModules/form/components/FieldWrapper'
import Remarks from 'coreModules/form/components/fields/Remarks'

import Places from './Places'
import Position from './Position'
import VerticalPosition from './VerticalPosition'

const propTypes = {
  formValueSelector: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
}

function LocationInformationFields({ getPath, formValueSelector }) {
  return (
    <Grid textAlign="left" verticalAlign="top">
      <Grid.Row>
        <Grid.Column computer={8} mobile={16} tablet={8}>
          <FieldWrapper
            autoComplete="off"
            component={Input}
            module="collectionMammals"
            name={getPath('localityT')}
            type="text"
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column computer={8} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={Input}
            module="collectionMammals"
            name={getPath('localityN')}
            type="text"
          />
        </Grid.Column>
      </Grid.Row>
      <VerticalPosition />
      <Position />

      <Grid.Column computer={8} mobile={16}>
        <Remarks
          formValueSelector={formValueSelector}
          module="collectionMammals"
          name={getPath('remarks')}
        />
      </Grid.Column>

      <Grid.Row>
        <Grid.Column computer={6} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={CustomData}
            module="collectionMammals"
            name={getPath('readOnly')}
            type="read-only"
          />
        </Grid.Column>
      </Grid.Row>
      <Places />
    </Grid>
  )
}

LocationInformationFields.propTypes = propTypes

export default compose(pathBuilder({ name: 'event.locationInformation' }))(
  LocationInformationFields
)
