import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';

import FoodAutoComplete from '../components/FoodAutoComplete/FoodAutoComplete';

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
    this.foodAutoComplete.typehead.getInstance().clear();
  }

  render() {
    return (
      <FoodAutoComplete
        ref={(foodAutoComplete) => { this.foodAutoComplete = foodAutoComplete; }}
        onSearch={name => this.props.data.refetch({ query: { name } })}
        onChange={items => this.props.onChange(items[0])}
        selected={this.props.selected}
        filterBy={this.props.filterBy}
        disabled={this.props.disabled}
        foods={this.props.data.foods}
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
