import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '../common/Tabs/Tabs';

import './Manage.css';

import Toolbar from '../common/Toolbar/Toolbar';
import Table from '../common/Table/Table';

const Manage = ({
  tabs,
  columns,
  items,
  isItemSelected,
  activeTab,
  handleTypeChange,
  toolbarActions,
  onItemClick,
  onitemDblClick,
}) => (
  <section className="manage">
    <Toolbar
      title="Manage"
      actions={toolbarActions}
    />
    
    <section>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={handleTypeChange}
      />

      <Table
        columns={columns}
        items={items}
        isSelected={isItemSelected}
        onRowClick={onItemClick}
        onRowDblClick={onitemDblClick}
      />
    </section>
  </section>
);

Manage.propTypes = {
  tabs: PropTypes.array,
  columns: PropTypes.array,
  items: PropTypes.array,
  isItemSelected: PropTypes.func,
  activeTab: PropTypes.string,
  onItemClick: PropTypes.func,
  onitemDblClick: PropTypes.func,
  toolbarActions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.node,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
  })),
};

Manage.defaultProps = {
  tabs: [],
  columns: [],
  items: [],
  isItemSelected: () => false,
  activeTab: null,
  onItemClick: () => {},
  onitemDblClick: () => {},
  toolbarActions: [],
};

export default Manage;