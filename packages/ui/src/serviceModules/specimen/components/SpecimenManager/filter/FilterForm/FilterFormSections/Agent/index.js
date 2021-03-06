import React, { PureComponent } from 'react'
import { Grid } from 'semantic-ui-react'
import { Field } from 'coreModules/form/components'

import { MultipleSearchTagsSelectField } from 'coreModules/search/components'

import { higherOrderComponents } from '../../../queryBuilder'

const WrappedMultipleSearchTagsSelectField = higherOrderComponents.createFieldHoc()(
  MultipleSearchTagsSelectField
)

class AgentFilterForm extends PureComponent {
  render() {
    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column width={16}>
          <Field
            autoComplete="off"
            component={WrappedMultipleSearchTagsSelectField}
            enableHelpNotifications={false}
            label="Name"
            name="agent.tagValues"
            resource="searchSpecimen"
            tagTypeFilterEnabled
            tagTypeInitialOptionValue="collector"
            tagTypeInlineDescription="Suggesting from"
            tagTypeMatchAllOptionText="any agent type"
          />
        </Grid.Column>
      </Grid>
    )
  }
}

export default AgentFilterForm
