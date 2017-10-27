import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { asyncContainer, Typeahead } from 'react-bootstrap-typeahead';

const AsyncTypeahead = asyncContainer(Typeahead);

class FoodAutoComplete extends Component {
  static propTypes = {
    onSearch: PropTypes.func,
    onChange: PropTypes.func,
    selected: PropTypes.object,
    filterBy: PropTypes.func,
    disabled: PropTypes.bool,
    foods: PropTypes.array,
  };

  static defaultProps = {
    onSearch: () => {},
    onChange: () => {},
    selected: null,
    filterBy: () => {},
    disabled: false,
    foods: [],
  };

  clear() {
    this.typeahead.getInstance().clear();
  }

  render() {
    const {
      selected,
      filterBy,
      disabled,
      onChange,
      onSearch,
      foods,
    } = this.props;

    return (
      <AsyncTypeahead
        ref={(typehead) => { this.typehead = typehead; } }
        labelKey="name"
        onSearch={onSearch}
        options={foods}
        onChange={items => onChange(items[0])}
        placeholder="Strat typing"
        selected={selected}
        filterBy={filterBy}
        disabled={disabled}
      />
    );
  }
}

export default FoodAutoComplete;
