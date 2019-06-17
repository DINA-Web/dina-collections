import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Button, Icon } from 'semantic-ui-react'
import objectPath from 'object-path'

import config from 'config'
import extractProps from 'utilities/extractProps'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import { FieldTemplate } from 'coreModules/form/components'
import { propTypes as fieldTemplateProps } from 'coreModules/form/components/FieldTemplate'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'

const propTypes = {
  focusOnMount: PropTypes.bool,
  forceRenderResult: PropTypes.bool,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  includeVerbatimAgent: PropTypes.bool,
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.number,
      PropTypes.object,
      PropTypes.string,
    ]).isRequired,
  }).isRequired,
  isLatestActiveField: PropTypes.bool,
  normalizedAgent: PropTypes.shape({
    attributes: PropTypes.shape({
      fullName: PropTypes.string,
    }),
  }),
  removeForceRenderResult: PropTypes.func,
  setAsLatestActiveField: PropTypes.func,
  textOnly: PropTypes.bool,
}
const defaultProps = {
  focusOnMount: false,
  forceRenderResult: false,
  includeVerbatimAgent: false,
  isLatestActiveField: false,
  normalizedAgent: undefined,
  removeForceRenderResult: undefined,
  setAsLatestActiveField: undefined,
  textOnly: false,
}

class AgentIdTextResult extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    if (this.props.focusOnMount && this.button && !config.isTest) {
      this.button.focus()
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.forceRenderResult &&
      prevProps.isLatestActiveField !== this.props.isLatestActiveField &&
      !this.props.isLatestActiveField
    ) {
      this.props.removeForceRenderResult()
    }
  }

  handleClick(event) {
    event.preventDefault()
    this.props.removeForceRenderResult()
    this.props.setAsLatestActiveField()
  }

  render() {
    const {
      i18n: { moduleTranslate },
      includeVerbatimAgent,
      input: { name, value },
      normalizedAgent,
      textOnly,
    } = this.props

    const inputText =
      (value && value.textI) || (includeVerbatimAgent ? value.textV : undefined)

    const fullName = objectPath.get(normalizedAgent, 'attributes.fullName')

    const agentName = fullName || inputText

    const disambiguatingDescription = objectPath.get(
      normalizedAgent,
      'attributes.disambiguatingDescription'
    )

    let agentNameSuffix
    if (textOnly) {
      agentNameSuffix = disambiguatingDescription
    } else {
      const suffix =
        (fullName && moduleTranslate({ module: 'agent', textKey: 'agent' })) ||
        (inputText && moduleTranslate({ module: 'form', textKey: 'plainText' }))
      agentNameSuffix = disambiguatingDescription
        ? `(${disambiguatingDescription}) [${suffix}]`
        : `[${suffix}]`
    }

    const { extractedProps } = extractProps({
      keys: Object.keys(fieldTemplateProps),
      props: this.props,
    })

    if (textOnly) {
      if (!agentName) {
        return null
      }

      return (
        <React.Fragment>
          {agentNameSuffix ? `${agentName} ${agentNameSuffix}` : agentName}
        </React.Fragment>
      )
    }

    return (
      <FieldTemplate {...extractedProps} name={name}>
        <div style={{ position: 'relative' }}>
          <strong>{agentName}</strong>
          {` ${agentNameSuffix}`}
          <Button
            data-testid="editAgentButton"
            icon
            onClick={this.handleClick}
            ref={element => {
              this.button = element
            }}
            style={{ marginLeft: '5px' }}
          >
            <Icon name="edit" />
          </Button>
        </div>
      </FieldTemplate>
    )
  }
}

AgentIdTextResult.propTypes = propTypes
AgentIdTextResult.defaultProps = defaultProps

export default compose(
  withI18n(),
  createGetItemById({
    idPath: 'input.value.normalized.id',
    itemKey: 'normalizedAgent',
    relationships: [],
    resource: 'normalizedAgent',
  })
)(AgentIdTextResult)
