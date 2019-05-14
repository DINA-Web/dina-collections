import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Dimmer, Grid, Loader } from 'semantic-ui-react'
import objectPath from 'object-path'

import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import { emToPixels } from 'coreModules/layout/utilities'

const propTypes = {
  fetchItemById: PropTypes.func.isRequired,
  focusedIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  itemId: PropTypes.string.isRequired,
  listItems: PropTypes.array.isRequired,
  nestedItem: PropTypes.object,
  onClickRow: PropTypes.func.isRequired,
  tableColumnSpecifications: PropTypes.array.isRequired,
  tableColumnsToShow: PropTypes.arrayOf(PropTypes.string.isRequired),
  width: PropTypes.number.isRequired,
}

const defaultProps = {
  nestedItem: undefined,
  tableColumnsToShow: undefined,
}

const InfinityTableRow = ({
  fetchItemById,
  focusedIndex,
  index,
  itemId,
  listItems,
  nestedItem,
  onClickRow,
  tableColumnSpecifications,
  tableColumnsToShow,
  width,
}) => {
  const latestListItems = useRef(null)

  useEffect(() => {
    if (listItems !== latestListItems.current) {
      if (itemId !== undefined) {
        fetchItemById(itemId)
      }
    }

    latestListItems.current = listItems
  }, [fetchItemById, itemId, listItems])

  const rowNumber = index + 1
  const isFocused = focusedIndex === index
  const background = isFocused // eslint-disable-line no-nested-ternary
    ? '#b5b5b5'
    : index % 2 === 0
    ? '#e5e7e9'
    : '#fff'

  if (!nestedItem) {
    return (
      <Grid.Row style={{ height: emToPixels(3.5), width }}>
        <Grid.Column style={{ width: 60 }}>
          <Dimmer active inverted>
            <Loader inverted size="mini" />
          </Dimmer>
        </Grid.Column>
      </Grid.Row>
    )
  }

  return (
    <Grid.Row
      data-isfocused={isFocused ? 'yes' : 'no'}
      data-testid={`infinityTableRow${rowNumber}`}
      onClick={event => {
        event.preventDefault()
        onClickRow(rowNumber, itemId)
      }}
      style={{ background, height: emToPixels(3.5), width }}
    >
      {tableColumnSpecifications.map(
        ({ buildText, fieldPath, label, width: columnWidth }) => {
          if (tableColumnsToShow.includes(fieldPath)) {
            let value = objectPath.get(nestedItem, fieldPath)

            const runBuildText =
              value && buildText && (Array.isArray(value) ? value.length : true)

            if (runBuildText) {
              value = buildText({ nestedItem, objectPath, value })
            }

            if (Array.isArray(value)) {
              value = value.join('; ')
            }

            return (
              <Grid.Column
                key={fieldPath || label}
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: columnWidth,
                }}
              >
                {value}
              </Grid.Column>
            )
          }

          return null
        }
      )}
    </Grid.Row>
  )
}

InfinityTableRow.propTypes = propTypes
InfinityTableRow.defaultProps = defaultProps

export default compose(createGetNestedItemById({ shouldFetch: false }))(
  InfinityTableRow
)
