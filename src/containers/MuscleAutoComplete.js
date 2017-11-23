import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';

import AutoComplete from '../components/common/AutoComplete/AutoComplete';

const muscles = gql`
  query muscles($query: MuscleQueryParams) {
    muscles(query: $query) {
      _id,
      name,
      group,
  }
}`;

class MuscleAutoCompleteContainer extends Component {
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
    filterBy: item => item,
    disabled: false,
  };

  clear() {
    this.muscleAutoComplete.clear();
  }

  render() {
    return (
      <AutoComplete 
        ref={(muscleAutoComplete) => { this.muscleAutoComplete = muscleAutoComplete; }}
        value={this.props.selected && this.props.selected.name}
        items={this.props.data.muscles}
        getItemValue={muscle => muscle.name}
        onChange={name => this.props.data.refetch({ query: { name } })}
        onSelect={item => this.props.onChange(item)}
        filterBy={this.props.filterBy}
        noItemsMessage="No items"
        disabled={this.props.disabled}
      />
    );
  }
}

const MuscleAutoCompleteWithData = graphql(muscles, {
  options: () => ({
    variables: {
      query: {},
    },
  }),
  withRef: true,
})(MuscleAutoCompleteContainer);

export default MuscleAutoCompleteWithData;
