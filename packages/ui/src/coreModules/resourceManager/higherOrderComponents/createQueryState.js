/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { push, goBack } from 'react-router-redux'
import { connect } from 'react-redux'
import { compose } from 'redux'
import queryString from 'query-string'

const createQueryNavigationState = () => ComposedComponent => {
  const mapDispatchToProps = {
    routerGoBack: goBack,
    routerPush: push,
  }

  const propTypes = {
    location: PropTypes.object.isRequired,
    routerGoBack: PropTypes.func.isRequired,
    routerPush: PropTypes.func.isRequired,
  }

  const defaultProps = {}

  class QueryNavigationState extends Component {
    constructor(props) {
      super(props)
      this.getQueryParams = this.getQueryParams.bind(this)
      this.replaceQueryParams = this.replaceQueryParams.bind(this)
      this.updateQueryParams = this.updateQueryParams.bind(this)
      this.clearQueryParams = this.clearQueryParams.bind(this)
      this.goBack = this.goBack.bind(this)
    }
    getQueryParams() {
      const { location } = this.props
      const parsedQuery = queryString.parse(location.search) || {}
      return Object.keys(parsedQuery).reduce((obj, key) => {
        let parsedValue = parsedQuery[key]

        if (parsedValue === 'true') {
          parsedValue = true
        }
        if (parsedValue === 'false') {
          parsedValue = false
        }

        return {
          ...obj,
          [key]: parsedValue,
        }
      }, {})
    }

    replaceQueryParams(newQueryObject, state = {}) {
      const { pathname } = this.props.location
      const search = queryString.stringify(newQueryObject)
      this.props.routerPush({ pathname, search, state })
    }

    updateQueryParams(newQueryObject, state = {}) {
      const queryObject = this.getQueryParams()
      const updateQueryParamsQueryObject = {
        ...queryObject,
        ...newQueryObject,
      }
      const search = queryString.stringify(updateQueryParamsQueryObject)
      const { pathname } = this.props.location
      this.props.routerPush({ pathname, search, state })
    }
    goBack() {
      this.props.routerGoBack()
    }

    clearQueryParams(params) {
      const { pathname } = this.props.location
      if (params) {
        const queryObject = this.getQueryParams()
        params.forEach(param => {
          delete queryObject[param]
        })

        const search = queryString.stringify(queryObject)
        this.props.routerPush({ pathname, search })
      } else {
        this.props.routerPush({ pathname })
      }
    }

    render() {
      const queryParams = this.getQueryParams()
      return (
        <ComposedComponent
          {...this.props}
          clearState={this.clearQueryParams}
          goBack={this.goBack}
          replaceState={this.replaceQueryParams}
          state={queryParams}
          updateState={this.updateQueryParams}
        />
      )
    }
  }

  QueryNavigationState.propTypes = propTypes
  QueryNavigationState.defaultProps = defaultProps

  return compose(
    withRouter,
    connect(
      null,
      mapDispatchToProps
    )
  )(QueryNavigationState)
}

export default createQueryNavigationState
