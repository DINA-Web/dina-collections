import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Form, Grid } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'

import createLog from 'utilities/log'
import FieldWrapper from 'coreModules/form/components/FieldWrapper'
import { Input, DropdownSearch } from 'coreModules/form/components'
import {
  CONTINENT,
  COUNTRY,
  DISTRICT,
  PLANET,
  PROVINCE,
} from '../../../constants'

export const FORM_NAME = 'searchPlaceFilter'

const log = createLog('modules:locality:BaseForm')

const propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
}

const defaultProps = {
  error: '',
}

const groups = [CONTINENT, COUNTRY, DISTRICT, PROVINCE, PLANET]

const dropdownOptions = groups.map(group => {
  return {
    key: group,
    text: group,
    value: group,
  }
})

const noop = () => {}

export class BaseForm extends Component {
  render() {
    log.render()
    const { error, handleSubmit } = this.props
    return (
      <Grid padded>
        <Grid.Column>
          <Form error={!!error} onSubmit={handleSubmit(noop)}>
            <Grid textAlign="left" verticalAlign="top">
              <Grid.Row>
                <Grid.Column width={16}>
                  <FieldWrapper
                    autoComplete="off"
                    component={Input}
                    enableHelpNotifications={false}
                    label="Name"
                    model="place"
                    module="locality"
                    name="name"
                    type="text"
                  />
                </Grid.Column>
                <Grid.Column width={16}>
                  <FieldWrapper
                    autoComplete="off"
                    component={DropdownSearch}
                    enableHelpNotifications={false}
                    fluid
                    label="Geographic level"
                    model="place"
                    module="locality"
                    name="group"
                    options={dropdownOptions}
                    type="dropdown-search-local"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

BaseForm.propTypes = propTypes
BaseForm.defaultProps = defaultProps

export default reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  form: FORM_NAME,
  keepDirtyOnReinitialize: true,
})(BaseForm)
