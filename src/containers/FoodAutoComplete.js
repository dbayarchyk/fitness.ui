import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';

import AutoComplete from '../components/common/AutoComplete/AutoComplete';

const foods = gql`
  query foods($query: FoodQueryParams) {
    foods(query: $query) {
      _id,
      name,
      avatarUrl
  }
}`;

class FoodAutoCompleteContainer extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    selected: PropTypes.object,
    filterBy: PropTypes.func,
    disabled: PropTypes.bool,
    data: PropTypes.object.isRequired,
  };

  static defaultProps = {
    onChange: () => {},
    selected: null,
    filterBy: () => {},
    disabled: false,
  };

  clear() {
    this.foodAutoComplete.clear();
  }

  render() {
    return (
      <AutoComplete 
        ref={(foodAutoComplete) => { this.foodAutoComplete = foodAutoComplete; }}
        value={this.props.selected && this.props.selected.name}
        items={this.props.data.foods}
        getItemValue={food => food.name}
        onChange={name => this.props.data.refetch({ query: { name } })}
        onSelect={item => this.props.onChange(item)}
        filterBy={this.props.filterBy}
        noItemsMessage="No items"
        disabled={this.props.disabled}
      />
    );
  }
}

const FoodAutoCompleteWithData = graphql(foods, {
  options: () => ({
    variables: {
      query: {},
    },
  }),
  withRef: true,
})(FoodAutoCompleteContainer);

export default FoodAutoCompleteWithData;
