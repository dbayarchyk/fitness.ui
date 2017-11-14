import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

import './AutoComplete.css';

class AutoComplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      isMenuOpen: false,
      selectedItem: null,
    };
  }

  onInputChange = (e) => {
    const value = e.target.value;

    this.setState({
      value,
      isMenuOpen: true,
    });

    this.props.onChange(value);
  }

  onItemSelect = (item) => {
    this.setState({ 
      value: this.props.getItemValue(item),
      isMenuOpen: false,
      selectedItem: null,
    });

    this.props.onSelect(item);
  }

  closeMenu = () => this.setState({ 
    isMenuOpen: false,
    selectedItem: null,
  })

  clear = () => this.setState({ value: '' })

  onKeyPressed = (e) => {
    switch(e.key) {
      case 'ArrowUp':
        this.selectPrevItem();
        break;
      case 'ArrowDown':
        this.selectNextItem();
        break;
      case 'Enter':
        this.selectItem();
        break;
      default:
        return
    }
  }

  selectPrevItem() {
    const items = this.getItems();
    const selectedItemIndex = items.indexOf(this.state.selectedItem);
    
    if (selectedItemIndex < 0) {
      this.setState({ selectedItem: items[0] });
    } else if (selectedItemIndex !== 0) {
      this.setState({ selectedItem: items[selectedItemIndex - 1] });
    }
  }

  selectNextItem() {
    const items = this.getItems();
    const selectedItemIndex = items.indexOf(this.state.selectedItem);

    if (selectedItemIndex !== items.length - 1) {
      this.setState({ selectedItem: items[selectedItemIndex + 1] });
    }
  }

  selectItem() {
    if (this.state.selectedItem) {
      this.onItemSelect(this.state.selectedItem);
    }
  }

  isItemSlelected = item => item === this.state.selectedItem

  getItems = () => this.props.items.filter(this.props.filterBy);
 
  render() {
    const {
      getItemValue,
      noItemsMessage,
      disabled,
    } = this.props;

    const items = this.getItems();

    return (
      <div className="autocomplete" tabIndex="0" onKeyDown={this.onKeyPressed}>
        <Input
          className="autocomplete__input"
          value={this.state.value}
          onChange={this.onInputChange}
          disabled={disabled}
        />

        {
          this.state.isMenuOpen && (
            <ListGroup className="autocomplete__list">
              {
                items.map(item => (
                  <ListGroupItem
                    className={`autocomplete__item autocomplete__item--with-action ${this.isItemSlelected(item) ? 'autocomplete__item--selected' : ''}`}
                    key={getItemValue(item)}
                    onClick={() => this.onItemSelect(item)}
                  >
                    {getItemValue(item)}
                  </ListGroupItem>
                ))
              }
    
              {
                !items.length && <ListGroupItem className="autocomplete__item">{noItemsMessage}</ListGroupItem>
              }
            </ListGroup>
          )
        }

        {
          this.state.isMenuOpen && <div className="autocomplete__overlay" onClick={this.closeMenu} />
        }
      </div>
    );
  }
}

AutoComplete.propTypes = {
  value: PropTypes.string,
  items: PropTypes.array,
  getItemValue: PropTypes.func,
  onSelect: PropTypes.func,
  noItemsMessage: PropTypes.string,
  disabled: PropTypes.bool,
  filterBy: PropTypes.func,
};

AutoComplete.defaultProps = {
  value: '',
  items: [],
  getItemValue: item => item,
  onSelect: () => {},
  onChange: () => {},
  noItemsMessage: 'No items',
  disabled: false,
  filterBy: item => true,
};

export default AutoComplete;
