import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import { MultipleChoiceCheckboxesField } from 'coreModules/search/components'

const sexFilter = 'matchSexTags'
const sexFieldName = `sex.sex|multipleChoice-${sexFilter}`

const propTypes = {
  getDrilldownQuery: PropTypes.func.isRequired,
}

class SexFilterForm extends PureComponent {
  render() {
    const { getDrilldownQuery } = this.props

    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column width={16}>
          <Field
            aggregationFunctionName="aggregateSexTags"
            component={MultipleChoiceCheckboxesField}
            displayCount
            drillDownQuery={getDrilldownQuery(sexFieldName)}
            filterFunctionName={sexFilter}
            label="Sex"
            name={sexFieldName}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

SexFilterForm.propTypes = propTypes

export default SexFilterForm
