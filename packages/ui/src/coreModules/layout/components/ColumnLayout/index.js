import React, { Component } from 'react'
import PropTypes from 'prop-types'

import extractProps from 'utilities/extractProps'

const propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      renderColumn: PropTypes.func,
      style: PropTypes.object,
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }).isRequired
  ),
  renderColumn: PropTypes.func,
  wrapperClassNames: PropTypes.string,
  wrapperId: PropTypes.string,
  wrapperStyle: PropTypes.object,
}
const defaultProps = {
  columns: undefined,
  renderColumn: undefined,
  wrapperClassNames: undefined,
  wrapperId: undefined,
  wrapperStyle: undefined,
}

class ColumnLayout extends Component {
  render() {
    const {
      columns,
      renderColumn,
      wrapperClassNames,
      wrapperId,
      wrapperStyle,
    } = this.props

    if (!columns || !columns.length) {
      return null
    }

    const { rest: thisPropsRest } = extractProps({
      keys: [
        'columns',
        'renderColumn',
        'wrapperClassNames',
        'wrapperId',
        'wrapperStyle',
      ],
      props: this.props,
    })

    return (
      <div
        className={wrapperClassNames}
        data-testid={wrapperId}
        id={wrapperId}
        style={{
          display: 'flex',
          ...(wrapperStyle || {}),
        }}
      >
        {columns.map((columnSpec, index) => {
          const {
            extractedProps: columnProps,
            rest: columnPropsRest,
          } = extractProps({
            keys: ['classNames', 'id', 'key', 'renderColumn', 'style', 'width'],
            props: columnSpec,
          })

          return (
            <div
              className={columnProps.classNames}
              data-testid={columnProps.id}
              id={columnProps.id}
              key={columnProps.key || index}
              style={
                columnProps.width
                  ? {
                      flex: 'none',
                      float: 'left',
                      width: columnProps.width,
                      ...(columnProps.style || {}),
                    }
                  : {
                      flex: 'auto',
                      float: 'left',
                      minWidth: 0, // needed to fix flexbox issue, kind of like: https://css-tricks.com/flexbox-truncated-text/
                      ...(columnProps.style || {}),
                    }
              }
            >
              {!columnProps.renderColumn &&
                renderColumn &&
                renderColumn(columnProps.key, {
                  ...thisPropsRest,
                  ...columnPropsRest,
                })}
              {columnProps.renderColumn &&
                columnProps.renderColumn({
                  ...thisPropsRest,
                  ...columnPropsRest,
                })}
            </div>
          )
        })}
      </div>
    )
  }
}

ColumnLayout.propTypes = propTypes
ColumnLayout.defaultProps = defaultProps

export default ColumnLayout
