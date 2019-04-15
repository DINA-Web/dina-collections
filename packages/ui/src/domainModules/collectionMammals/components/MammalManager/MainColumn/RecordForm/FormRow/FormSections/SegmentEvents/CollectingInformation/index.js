import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Grid, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'

import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'
import {
  Checkbox,
  DateRange,
  DropdownSearch,
  Field,
  Input,
} from 'coreModules/form/components'
import globalCrudSelectors from 'coreModules/crud/globalSelectors'
import { createEnsureAllItemsFetched } from 'coreModules/crud/higherOrderComponents'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import i18nSelectors from 'coreModules/i18n/globalSelectors'
import { TogglableAgentDropdownPickerSearch } from 'domainModules/agent/components'
import LocationInformationFields from './LocationInformationFields'

const log = createLog(
  'modules:specimen:MammalForm:SegmentCollectingInformation'
)

const ModuleTranslate = createModuleTranslate('collectionMammals')

const mapStateToProps = state => {
  const currentLanguage = i18nSelectors.getLanguage(state)
  return {
    establishmentMeansTypeOptions: globalCrudSelectors.establishmentMeansType.getAllAsOptions(
      state,
      currentLanguage
    ),
  }
}

const propTypes = {
  allPlacesFetched: PropTypes.bool.isRequired,
  establishmentMeansTypeOptions: PropTypes.array.isRequired,
  getPath: PropTypes.func.isRequired,
}

class SegmentCollectingInformation extends PureComponent {
  render() {
    const {
      allPlacesFetched,
      establishmentMeansTypeOptions,
      getPath,
    } = this.props

    log.render()
    return (
      <React.Fragment>
        <Header size="medium">
          <ModuleTranslate capitalize textKey="headers.collectingInformation" />
        </Header>
        <Grid textAlign="left" verticalAlign="top">
          {allPlacesFetched && <LocationInformationFields />}

          <Grid.Column computer={6} mobile={16}>
            <Field
              autoComplete="off"
              component={TogglableAgentDropdownPickerSearch}
              module="specimen"
              name={getPath('collectedByAgent')}
            />
          </Grid.Column>
          <Grid.Column computer={6} mobile={16}>
            <Field
              autoComplete="off"
              component={Input}
              module="specimen"
              name={getPath('collectorsText')}
              type="text"
            />
          </Grid.Column>

          <Grid.Column computer={4} mobile={16}>
            <Field
              autoComplete="off"
              component={Input}
              module="specimen"
              name={getPath('event.expeditionText')}
              type="text"
            />
          </Grid.Column>

          <Grid.Column computer={4} mobile={16} tablet={4}>
            <Field
              autoComplete="off"
              component={DropdownSearch}
              module="specimen"
              name={getPath('establishmentMeansType.id')}
              options={establishmentMeansTypeOptions}
              type="dropdown-search-local"
            />
          </Grid.Column>

          <Grid.Row>
            <Grid.Column mobile={16}>
              <Header size="small">Collecting date</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={16} mobile={16} tablet={8}>
              <DateRange
                autoComplete="off"
                formName="mammalForm"
                module="specimen"
                name={getPath('event.dateRange')}
                past
                requireYYYYMMDD
                stack={false}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={4} mobile={16} tablet={4}>
              <Field
                autoComplete="off"
                component={Checkbox}
                inline
                module="specimen"
                name={getPath('isDeathDate')}
                type="checkbox"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    )
  }
}

SegmentCollectingInformation.propTypes = propTypes

export default compose(
  createEnsureAllItemsFetched({ resource: 'establishmentMeansType' }),
  pathBuilder({ name: 'individual.collectingInformation.0' }),
  connect(mapStateToProps)
)(SegmentCollectingInformation)
