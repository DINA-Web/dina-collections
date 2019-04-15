import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import { ViewWrap } from 'coreModules/layout/components'
import Footer from '../../components/Footer'
import Login from '../login/Async'
import PageNotFound from '../pageNotFound/Async'
import Home from '../home/Async'

class Public extends Component {
  render() {
    return (
      <ViewWrap>
        <Switch>
          <Route component={Login} exact path="/login" />
          <Route component={Home} exact path="/" />
          <Route component={PageNotFound} />
        </Switch>
        <Footer />
      </ViewWrap>
    )
  }
}

export default Public
