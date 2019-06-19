import React, { PureComponent } from 'react'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import { MultipleSearchTagsSelectField } from 'coreModules/search/components'

import { higherOrderComponents } from '../../../queryBuilder'

const WrappedMultipleSearchTagsSelectField = higherOrderComponents.createFieldHoc()(
  MultipleSearchTagsSelectField
)

class IdentifierFilterForm extends PureComponent {
  render() {
    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column width={16}>
          <Field
            autoComplete="off"
            component={WrappedMultipleSearchTagsSelectField}
            enableHelpNotifications={false}
            label="Identifier value"
            module="specimen"
            name="identifier.tagValues"
            resource="searchSpecimen"
            tagTypeFilterEnabled
            tagTypeInitialOptionValue="catalog-no"
            tagTypeInlineDescription="Suggesting from"
            tagTypeMatchAllOptionText="any identifier type"
            translationScope="enums.identifiers"
          />
        </Grid.Column>
      </Grid>
    )
  }
}

export default IdentifierFilterForm
