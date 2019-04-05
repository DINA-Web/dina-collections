import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Menu } from 'semantic-ui-react'

const propTypes = {
  createItemActive: PropTypes.bool.isRequired,
  editItemActive: PropTypes.bool.isRequired,
  itemEnabled: PropTypes.bool.isRequired,
  onFormTabClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  onListTabClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  onToggleFilters: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  onTreeTabClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  tableActive: PropTypes.bool.isRequired,
  treeActive: PropTypes.bool.isRequired,
  treeEnabled: PropTypes.bool.isRequired,
}

export class ResultOptionsBar extends Component {
  render() {
    const {
      createItemActive,
      editItemActive,
      itemEnabled,
      onFormTabClick: handleFormTabClick,
      onListTabClick: handleListTabClick,
      onToggleFilters: handleToggleFilters,
      onTreeTabClick: handleTreeTabClick,
      tableActive,
      treeActive,
      treeEnabled,
    } = this.props

    return (
      <Menu attached="top" icon style={{ position: 'relative' }} tabular>
        <Menu.Item
          active={tableActive}
          data-testid="tableTabMenuItem"
          link
          name="table"
          onClick={event => handleListTabClick(event)}
        >
          <Icon name="table" />
        </Menu.Item>

        {treeEnabled && (
          <Menu.Item
            active={treeActive}
            link
            name="form"
            onClick={event => handleTreeTabClick(event)}
          >
            <Icon name="sitemap" />
          </Menu.Item>
        )}

        {itemEnabled && (
          <Menu.Item
            active={createItemActive || editItemActive}
            data-testid="formTabMenuItem"
            link
            name="form"
            onClick={event => handleFormTabClick(event)}
          >
            <Icon name="wordpress forms" />
          </Menu.Item>
        )}

        {!(createItemActive || treeActive) && (
          <Menu.Menu className="icon secondary  ui" position="right">
            <Menu.Item
              data-testid="searchMenuItem"
              link
              onClick={event => handleToggleFilters(event)}
              style={{ marginLeft: '3.125em' }}
            >
              <Icon disabled={!handleToggleFilters} name="search" />
            </Menu.Item>
          </Menu.Menu>
        )}
      </Menu>
    )
  }
}

ResultOptionsBar.propTypes = propTypes

export default ResultOptionsBar
