import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch } from 'react-router-dom'

import { PageTemplate } from 'coreModules/commonUi/components'
import { ViewWrap } from 'coreModules/layout/components'
import GeneralDocs from 'coreModules/documentation/components/GeneralDocs'
import DataModel from 'coreModules/documentation/components/DataModel'
import Nav from 'coreModules/documentation/components/Nav'
import getCurrentSchemaVersion from 'coreModules/documentation/utilities/getCurrentSchemaVersion'
import Footer from '../../components/Footer'

const propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
}

class Docs extends Component {
  render() {
    const { match } = this.props
    const currentVersion = getCurrentSchemaVersion()
    return (
      <React.Fragment>
        <ViewWrap leftSidebarEnabled leftSidebarWidth={180}>
          <PageTemplate container={false} fullViewHeight>
            <Switch>
              <Redirect
                exact
                from={match.url}
                to={`${match.url}/${currentVersion}/introduction`}
              />
              <Redirect
                exact
                from={`${match.url}/${currentVersion}/general`}
                to={`${match.url}/${currentVersion}/introduction`}
              />

              <Route component={GeneralDocs} exact path={`${match.url}`} />
              <Route
                component={GeneralDocs}
                exact
                path={`${match.url}/:schemaVersion/:docName`}
              />
              <Route
                component={DataModel}
                exact
                path={`${
                  match.url
                }/:schemaVersion/models/:modelId/:parameterId`}
              />
              <Route
                component={DataModel}
                path={`${match.url}/:schemaVersion/models/:modelId`}
              />
            </Switch>
          </PageTemplate>
          <Footer />
        </ViewWrap>
        <Route component={Nav} path={`${match.url}/:schemaVersion`} />
      </React.Fragment>
    )
  }
}

Docs.propTypes = propTypes

export default Docs
