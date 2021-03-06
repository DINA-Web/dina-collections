import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Icon } from 'semantic-ui-react'

import createDeleteProperties from 'common/src/createDeleteProperties'
import config from 'config'

const deleteUndefinedProperties = createDeleteProperties(undefined)

const closeIconStyle = {
  bottom: 0,
  fontSize: '1rem',
  lineHeight: 1,
  margin: 'auto',
  position: 'absolute',
  right: '2.5em',
  top: 0,
  zIndex: 1,
}

const containerStyle = {
  display: 'inline-block',
  position: 'relative',
  width: '100%',
}

const propTypes = {
  autoComplete: PropTypes.string,
  disableClearValue: PropTypes.bool,
  disabled: PropTypes.bool,
  displayAsButton: PropTypes.bool,
  fluid: PropTypes.bool,
  focusOnMount: PropTypes.bool,
  icon: PropTypes.string,
  initialText: PropTypes.string,
  input: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isLoading: PropTypes.bool,
  mountHidden: PropTypes.bool,
  onSearchChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.shape({
          normalized: PropTypes.shape({
            id: PropTypes.string,
          }),
          textI: PropTypes.string,
          textV: PropTypes.string,
        }),
      ]).isRequired,
    }).isRequired
  ).isRequired,
  placeholder: PropTypes.string,
  searchQuery: PropTypes.string,
  selectedOption: PropTypes.shape({
    key: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.shape({
        normalized: PropTypes.shape({
          id: PropTypes.string,
        }),
        textI: PropTypes.string,
        textV: PropTypes.string,
      }),
    ]).isRequired,
  }),
  text: PropTypes.string,
  type: PropTypes.string.isRequired,
}
const defaultProps = {
  autoComplete: undefined,
  disableClearValue: false,
  disabled: false,
  displayAsButton: false,
  fluid: true,
  focusOnMount: false,
  icon: undefined,
  initialText: '',
  isLoading: false,
  mountHidden: config.isTest,
  placeholder: undefined,
  searchQuery: '',
  selectedOption: undefined,
  text: undefined,
}

class DropdownSearchInput extends Component {
  constructor(props) {
    super(props)
    this.handleClear = this.handleClear.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  componentDidMount() {
    if (this.props.focusOnMount && !this.props.selectedOption) {
      this.input.handleFocus()
    }
  }

  handleSearchChange(_, { searchQuery }) {
    this.props.onSearchChange({
      inputName: this.props.input.name,
      searchQuery,
    })
  }

  handleOnBlur() {
    this.props.input.onBlur() // need onBlur to touch field for redux-form validation
    this.handleSearchChange(null, { searchQuery: '' })
  }

  handleOnChange(_, data) {
    const { value } = data
    this.handleSearchChange(null, { searchQuery: '' })
    if (this.props.type === 'dropdown-search-id-text') {
      const updatedValue = deleteUndefinedProperties({
        ...this.props.input.value,
        ...value,
        normalized: value.normalized,
        textI: value.textI,
      })

      this.props.input.onBlur(updatedValue)
    } else {
      this.props.input.onBlur(value)
    }
  }

  handleClear() {
    if (this.props.type === 'dropdown-search-id-text') {
      this.handleOnChange(undefined, {
        value: {
          ...this.props.input.value,
          normalized: undefined,
          textI: undefined,
        },
      })
    } else {
      this.handleOnChange(undefined, { value: '' })
    }
  }

  render() {
    const {
      autoComplete,
      disableClearValue,
      disabled,
      displayAsButton,
      fluid,
      icon,
      initialText,
      input,
      isLoading,
      mountHidden,
      options,
      placeholder,
      searchQuery,
      selectedOption,
    } = this.props

    const { onChange } = input
    const hiddenInputName = `${input.name}.hidden`
    const text = (selectedOption && selectedOption.text) || initialText
    const style = displayAsButton
      ? { background: 'white', borderRadius: 0, fontWeight: 'normal' }
      : undefined
    const value = selectedOption && selectedOption.value

    return (
      <React.Fragment>
        <div style={containerStyle}>
          {!disableClearValue && value && (
            <Icon
              data-testid="clearDropdownIcon"
              link
              name="close"
              onClick={this.handleClear}
              style={closeIconStyle}
            />
          )}
          <Dropdown
            autoComplete={autoComplete}
            button={displayAsButton}
            disabled={disabled}
            fluid={fluid}
            icon={icon}
            loading={isLoading}
            onSearchChange={this.handleSearchChange}
            options={options}
            placeholder={placeholder}
            ref={element => {
              this.input = element
            }}
            search
            searchQuery={searchQuery}
            selection
            selectOnBlur={false}
            selectOnNavigation={false}
            text={searchQuery || text}
            {...input}
            onBlur={this.handleOnBlur}
            onChange={this.handleOnChange}
            style={style}
            value={value || ''}
          />
        </div>
        {mountHidden && (
          <input
            className="hidden"
            {...input}
            name={hiddenInputName}
            onChange={event => {
              onChange(event, { value: event.target.value })
            }}
            type="hidden"
            value={input.value || ''}
          />
        )}
      </React.Fragment>
    )
  }
}

DropdownSearchInput.propTypes = propTypes
DropdownSearchInput.defaultProps = defaultProps

export default DropdownSearchInput
