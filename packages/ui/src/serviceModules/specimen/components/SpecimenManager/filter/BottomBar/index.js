import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { isInvalid, isPristine } from 'redux-form'
import { Button, Grid } from 'semantic-ui-react'
import { KeyboardShortcuts } from 'coreModules/keyboardShortcuts/components'

const mapStateToProps = (state, { form }) => {
  return {
    invalid: isInvalid(form)(state),
    pristine: isPristine(form)(state),
  }
}

const propTypes = {
  invalid: PropTypes.bool.isRequired,
  onResetFilters: PropTypes.func.isRequired,
  onSearchSpecimens: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
}
const defaultProps = {}

class BottomBar extends PureComponent {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handlePressEnter = this.handlePressEnter.bind(this)
    this.state = { loading: false }

    this.shortcuts = [
      {
        command: 'enter',
        description: 'Execute search',
        onPress: this.handlePressEnter,
      },
    ]
  }

  handlePressEnter(event) {
    if (event.target && event.target.tagName === 'BUTTON') {
      return
    }
    this.handleSearch(event)
  }

  handleSearch(event) {
    event.preventDefault()
    this.setState({ loading: true })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return this.props
          .onSearchSpecimens()
          .then(() => {
            this.setState({ loading: false })
          })
          .then(resolve)
          .catch(reject)
      })
    })
  }

  render() {
    const { invalid, onResetFilters: handleReset, pristine } = this.props

    return (
      <React.Fragment>
        <KeyboardShortcuts shortcuts={this.shortcuts} />
        <Grid padded>
          <Grid.Column>
            <Button
              data-testid="searchButton"
              disabled={invalid}
              loading={this.state.loading}
              onClick={this.handleSearch}
              size="large"
              style={{ float: 'left' }}
            >
              Search
            </Button>
            <Button
              basic
              data-testid="clearAllFiltersButton"
              disabled={pristine}
              onClick={handleReset}
              size="large"
              style={{ float: 'right' }}
            >
              Clear all filters
            </Button>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    )
  }
}

BottomBar.propTypes = propTypes
BottomBar.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(BottomBar)
