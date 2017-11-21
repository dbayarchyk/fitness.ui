import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import FontAwesome from 'react-fontawesome';

import * as manageActions from '../actions/manage';
import * as TYPE from '../constants/manageTypes';

import withLoading from '../utils/withLoading';
import TABS from '../constants/manageTabs';
import COLUMNS from '../constants/manageColumns';
import Manage from '../components/Manage/Manage';

class ManageContainer extends Component {
  static propTypes = {
    currentUserId: PropTypes.string,
    items: PropTypes.array,
    selectedItemId: PropTypes.string,
    activeType: PropTypes.string,
    client: PropTypes.shape({
      mutate: PropTypes.func.isRequired,
      query: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        type: PropTypes.string.isRequired,
      }),
    }).isRequired,
    setActiveType: PropTypes.func.isRequired,
    getItems: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    setSelectedItemId: PropTypes.func.isRequired,
    resetData: PropTypes.func.isRequired,
  }

  static defaultProps = {
    currentUserId: null,
    items: [],
    selectedItemId: null,
    activeType: null,
  }

  componentDidMount() {
    this.setDataByActiveType(this.props.match.params.type);
  }

  componentWillUnmount() {
    this.props.resetData();
  }

  handleTypeChange = ({ id }) => this.props.history.replace(`/app/manage/${id}`)

  setDataByActiveType = activeType => {
    this.props.resetData();
    this.props.setActiveType(activeType);
    this.props.getItems(this.props.client.query);
  }

  edit = () => {
    this.props.history.push(`/app/muscle-builder/${this.props.selectedItemId}`);
  }

  delete = () => {
    this.props.removeItem(this.props.client.mutate);
  }

  create = () => {
    this.props.history.push('/app/muscle-builder');
  }

  isEditDisabled = () => {
    return !this.props.selectedItemId || this.props.activeType !== TYPE.MUSCLES;
  }

  isDeleteDisabled = () => {
    if (this.props.activeType === TYPE.USERS && this.props.selectedItemId === this.props.currentUserId) {
      return true;
    }

    return !this.props.selectedItemId;
  }

  isCreateDisabled = () => {
    return this.props.activeType !== TYPE.MUSCLES;
  }

  handleItemSelection = (selectedItemIndex) => {
    const slectedItemId = selectedItemIndex.length === 1
      ? this.props.items[selectedItemIndex[0]]._id
      : null;

    this.props.setSelectedItemId(slectedItemId);
  }

  onItemClick = (event, item) => {
    this.props.setSelectedItemId(item._id === this.props.selectedItemId ? null :item._id)
  }

  onItemDblClick = (event, item) => {}

  render() {
    const toolbarActions = [
      {
        icon: <FontAwesome name="pencil" />,
        title: 'Edit',
        onClick: this.edit,
        disabled: this.isEditDisabled(),
      },
      {
        icon: <FontAwesome name="trash" />,
        title: 'Delete',
        onClick: this.delete,
        disabled: this.isDeleteDisabled(),
      },
      {
        icon: <FontAwesome name="plus-square" />,
        title: 'Create',
        onClick: this.create,
        disabled: this.isCreateDisabled(),
      },
    ];

    return (
      <Manage
        tabs={TABS}
        columns={COLUMNS[this.props.activeType]}
        items={this.props.items}
        activeTab={this.props.activeType}
        handleTypeChange={this.handleTypeChange}
        isItemSelected={item => item._id === this.props.selectedItemId}
        toolbarActions={toolbarActions}
        onItemClick={this.onItemClick}
        onItemDblClick={this.onItemDblClick}
      />
    );
  }
}

const mapStateToProps = state => ({
  currentUserId: state.auth.currentUser._id,
  isLoading: state.manage.isLoading,
  items: Object.values(state.manage.items),
  selectedItemId: state.manage.selectedItemId,
  activeType: state.manage.activeType,
});

const mapDispatchToProps = dispatch => ({
  setActiveType: activeType => dispatch(manageActions.setActiveType(activeType)),
  getItems: query => dispatch(manageActions.getItems(query)),
  removeItem: mutate => dispatch(manageActions.removeItem(mutate)),
  setSelectedItemId: selectedItemId => dispatch(manageActions.setSelectedItemId(selectedItemId)),
  resetData: () => dispatch(manageActions.resetData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withApollo(withLoading(ManageContainer))
);
