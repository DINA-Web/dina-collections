import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Header, Grid } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { Checkbox, Field, Input, Remarks } from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'

const log = createLog('modules:collectionMammals:MammalForm:OriginInformation')

const propTypes = {
  getPath: PropTypes.func.isRequired,
}

class OriginInformation extends PureComponent {
  render() {
    const { getPath } = this.props
    log.render()
    return (
      <React.Fragment>
        <Header size="medium">Origin information</Header>
        <Grid textAlign="left" verticalAlign="top">
          <Grid.Row>
            <Grid.Column computer={4} mobile={16}>
              <Field
                autoComplete="off"
                component={Input}
                label="Origin locality"
                module="specimen"
                name={getPath('originLocality')}
                type="text"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={8} mobile={16} tablet={4}>
              <Field
                autoComplete="off"
                component={Checkbox}
                inline
                label="Result of selective breeding"
                module="specimen"
                name={getPath('isResultOfSelectiveBreeding')}
                type="checkbox"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={8} mobile={16} tablet={4}>
              <Field
                autoComplete="off"
                component={Checkbox}
                inline
                label="Affected by management"
                module="specimen"
                name={getPath('isAffectedByManagement')}
                type="checkbox"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={8} mobile={16}>
              <Field
                autoComplete="off"
                component={Remarks}
                label="Origin remarks"
                module="specimen"
                name={getPath('remarks')}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    )
  }
}

OriginInformation.propTypes = propTypes

export default compose(pathBuilder({ name: 'individual.originInformation.0' }))(
  OriginInformation
)
