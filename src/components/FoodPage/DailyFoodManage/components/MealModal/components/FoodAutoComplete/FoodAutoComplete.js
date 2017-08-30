import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { asyncContainer, Typeahead, Menu, MenuItem } from 'react-bootstrap-typeahead';

const foods = gql`
  query foods($query: FoodQueryParams) {
    foods(query: $query) {
      _id,
      name,
      avatarUrl
  }
}`;

const AsyncTypeahead = asyncContainer(Typeahead);

class FoodAutoComplete extends Component {
  clear() {
    this.refs.typeahead.getInstance().clear()
  }

  render() {
    return (
      <AsyncTypeahead
        ref="typeahead"
        labelKey="name"
        onSearch={name => this.props.data.refetch({ query: { name, }})}
        options={this.props.data.foods || []}
        onChange={items => this.props.onChange(items[0])}
        placeholder="Strat typing"
        selected={this.props.selected}
        filterBy={this.props.filterBy}
        disabled={this.props.disabled}
      />
    );
  }
}

const FoodAutoCompleteWithData = graphql(foods, {
  options: (props) => ({
    variables: {
      query: { }
    },
  }),
  withRef: true
})(FoodAutoComplete)

export default FoodAutoCompleteWithData;