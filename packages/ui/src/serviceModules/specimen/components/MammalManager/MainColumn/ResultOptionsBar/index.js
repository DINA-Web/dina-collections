import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Menu } from 'semantic-ui-react'
import CsvExporter from './CsvExporter'

const propTypes = {
  isItemViewOrSettings: PropTypes.bool.isRequired,
  isTableViewOrSettings: PropTypes.bool.isRequired,
  onExportCsv: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
  onFormTabClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  onSettingClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  onTableTabClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  onToggleFilters: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
}

export class ResultOptionsBar extends Component {
  render() {
    const {
      isItemViewOrSettings,
      isTableViewOrSettings,
      onExportCsv: handleExportToCsv,
      onFormTabClick: handleFormTabClick,
      onSettingClick: handleSettingClick,
      onTableTabClick: handleTableTabClick,
      onToggleFilters: handleToggleFilters,
    } = this.props

    return (
      <Menu attached="top" icon tabular>
        <Menu.Item
          active={isTableViewOrSettings}
          data-testid="tableTabMenuItem"
          link
          name="table"
          onClick={event => {
            if (handleTableTabClick) {
              handleTableTabClick(event)
            }
          }}
        >
          <Icon name="table" />
        </Menu.Item>
        <Menu.Item
          active={isItemViewOrSettings}
          data-testid="formTabMenuItem"
          link
          name="form"
          onClick={event => {
            if (handleFormTabClick) {
              handleFormTabClick(event)
            }
          }}
        >
          <Icon name="wordpress forms" />
        </Menu.Item>
        <Menu.Menu className="icon secondary  ui" position="right">
          {handleExportToCsv && <CsvExporter />}
          {handleSettingClick && (
            <Menu.Item
              data-testid="settingsMenuItem"
              link
              onClick={event => handleSettingClick(event)}
            >
              <Icon name="setting" />
            </Menu.Item>
          )}
          <Menu.Item
            data-testid="searchMenuItem"
            link
            onClick={event => handleToggleFilters(event)}
            style={{ marginLeft: '3.125em' }}
          >
            <Icon name="search" />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

ResultOptionsBar.propTypes = propTypes

export default ResultOptionsBar