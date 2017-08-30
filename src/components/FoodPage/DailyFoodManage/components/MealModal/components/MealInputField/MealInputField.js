import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
  ListGroup,
  ListGroupItem,
  InputGroupButton
} from 'reactstrap';

import './MealInputField.css';
import FoodAutoComplete from '../FoodAutoComplete/FoodAutoComplete';

const MealInputField = ({ avatarUrl, foodAutoCompleteConfig, weightInputConfig, buttonConfig }) => (
  <InputGroup>
    <InputGroupAddon>
      <img src={avatarUrl} className="meal-input-field__avatar"/>
    </InputGroupAddon>
    <FoodAutoComplete {...foodAutoCompleteConfig}/>
    <Input type="number" placeholder="Weight" {...weightInputConfig}/>
    <InputGroupAddon>g</InputGroupAddon>
    <InputGroupButton>
      <Button {...buttonConfig}></Button>
    </InputGroupButton>
  </InputGroup>
);

MealInputField.propTypes = {
  avatarUrl: PropTypes.string,
  foodAutoCompleteConfig: PropTypes.shape({
    disabled: PropTypes.bool,
    onChange: PropTypes.func
  }),
  weightInputConfig: PropTypes.shape({
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.number,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
  }),
  buttonConfig: PropTypes.shape({
    children: PropTypes.node,
    color: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
  })
};

export default MealInputField;