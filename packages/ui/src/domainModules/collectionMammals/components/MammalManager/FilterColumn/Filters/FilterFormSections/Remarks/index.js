import React, { PureComponent } from 'react'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import {
  SearchPreviewField,
  TagTypeDropdownField,
} from 'coreModules/search/components'
import { ANY } from 'coreModules/search/constants'
import { higherOrderComponents } from '../../../queryBuilder'

const WrappedTagTypeDropdownField = higherOrderComponents.createFieldHoc()(
  TagTypeDropdownField
)

const WrappedSearchPreviewField = higherOrderComponents.createFieldHoc()(
  SearchPreviewField
)

class Remarks extends PureComponent {
  render() {
    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Row>
          <Grid.Column
            style={{
              // to be above grid margin inside WrappedSearchPreviewField
              zIndex: 10,
            }}
            width={16}
          >
            <Field
              autoComplete="off"
              capitalize
              component={WrappedTagTypeDropdownField}
              enableHelpNotifications={false}
              inline
              module="collectionMammals"
              name="remarks.srcField"
              resource="searchSpecimen"
              tagTypeInitialOptionValue={ANY}
              tagTypeMatchAllOptionText="Any remarks type"
              translationScope="enums.remarks"
            />
          </Grid.Column>
          <Grid.Column width={16}>
            <Field
              autoComplete="off"
              component={WrappedSearchPreviewField}
              enableHelpNotifications={false}
              module="collectionMammals"
              name="remarks.search"
              resource="searchSpecimen"
              translationScope="enums.remarks"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Remarks
