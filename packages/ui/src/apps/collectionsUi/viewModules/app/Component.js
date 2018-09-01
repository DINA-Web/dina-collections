import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Route, Switch } from 'react-router-dom'

import { AppNavigationSidebar, ViewWrap } from 'coreModules/layout/components'
import { requireLoggedIn } from 'coreModules/user/higherOrderComponents'
import {
  KeyboardShortcuts,
  ShortcutsDisplay,
} from 'coreModules/keyboardShortcuts/components'

import Home from '../home/Async'
import SpecimensMammals from '../specimensMammals/Async'
import PageNotFound from '../pageNotFound/Async'
import Settings from '../settings/Async'
import ManageAgents from '../manageAgents/Async'
import ManageLocalities from '../manageLocalities/Async'
import ManageStorageLocations from '../manageStorageLocations/Async'
import ManageTaxonomy from '../manageTaxonomy/Async'
import ManageTaxonNames from '../manageTaxonNames/Async'

const propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
}

class App extends Component {
  constructor(props) {
    super(props)
    this.shortcuts = [
      {
        command: 'n h',
        description: 'Navigate to home',
        params: { path: '/app' },
        type: 'push',
      },
      {
        command: 'n s',
        description: 'Navigate to specimens',
        params: { path: '/app/specimens/mammals' },
        type: 'push',
      },
    ]
  }

  render() {
    const { match } = this.props

    return (
      <React.Fragment>
        <KeyboardShortcuts shortcuts={this.shortcuts} />
        <ViewWrap leftSidebarEnabled leftSidebarTogglable topMenuEnabled>
          <Switch>
            <Route component={Home} exact path={match.url} />
            <Route
              component={SpecimensMammals}
              exact
              path={`${match.url}/specimens/mammals`}
            />
            <Route
              component={SpecimensMammals}
              exact
              path={`${match.url}/specimens/mammals/create/sections/:sectionId`}
            />
            <Route
              component={SpecimensMammals}
              exact
              path={`${
                match.url
              }/specimens/mammals/:specimenId/edit/sections/:sectionId`}
            />
            <Route
              component={SpecimensMammals}
              exact
              path={`${match.url}/specimens/mammals/search`}
            />
            <Route
              component={SpecimensMammals}
              exact
              path={`${match.url}/specimens/mammals/search/settings`}
            />
            <Route
              component={ManageAgents}
              exact
              path={`${match.url}/agents`}
            />
            <Route
              component={ManageAgents}
              path={`${match.url}/agents/create`}
            />
            <Route
              component={ManageAgents}
              path={`${match.url}/agents/:agentId/edit`}
            />
            <Route
              component={ManageAgents}
              path={`${match.url}/agents/:agentId/inspect`}
            />
            <Route
              component={ManageLocalities}
              exact
              path={`${match.url}/localities`}
            />
            <Route
              component={ManageLocalities}
              path={`${match.url}/localities/create`}
            />
            <Route
              component={ManageLocalities}
              path={`${match.url}/localities/:itemId/createChild`}
            />
            <Route
              component={ManageLocalities}
              path={`${match.url}/localities/:itemId/edit`}
            />
            <Route
              component={ManageLocalities}
              path={`${match.url}/localities/list`}
            />
            <Route
              component={ManageLocalities}
              path={`${match.url}/localities/tree`}
            />
            <Route
              component={ManageLocalities}
              path={`${match.url}/localities/:itemId/inspect`}
            />
            <Route
              component={ManageStorageLocations}
              exact
              path={`${match.url}/storageLocations`}
            />
            <Route
              component={ManageStorageLocations}
              path={`${match.url}/storageLocations/create`}
            />
            <Route
              component={ManageStorageLocations}
              path={`${
                match.url
              }/storageLocations/:storageLocationId/createChild`}
            />
            <Route
              component={ManageStorageLocations}
              path={`${match.url}/storageLocations/:storageLocationId/edit`}
            />
            <Route
              component={ManageStorageLocations}
              path={`${match.url}/storageLocations/:storageLocationId/inspect`}
            />
            <Route
              component={ManageTaxonomy}
              exact
              path={`${match.url}/taxa`}
            />
            <Route
              component={ManageTaxonomy}
              path={`${match.url}/taxa/create`}
            />
            <Route
              component={ManageTaxonomy}
              path={`${match.url}/taxa/:taxonId/createChild`}
            />
            <Route
              component={ManageTaxonomy}
              path={`${match.url}/taxa/:taxonId/edit`}
            />
            <Route
              component={ManageTaxonomy}
              path={`${match.url}/taxa/:taxonId/inspect`}
            />
            <Route
              component={ManageTaxonNames}
              exact
              path={`${match.url}/taxonNames`}
            />

            <Route component={Settings} exact path={`${match.url}/settings`} />
            <Route component={PageNotFound} />
          </Switch>
        </ViewWrap>
        <AppNavigationSidebar />
        <ShortcutsDisplay />
      </React.Fragment>
    )
  }
}

App.propTypes = propTypes

export default compose(requireLoggedIn)(App)
