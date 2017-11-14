import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupButton,
} from 'reactstrap';

import './MealInputField.css';
import FoodAutoComplete from '../../containers/FoodAutoComplete';

const MealInputField = ({
  avatarUrl,
  foodAutoCompleteConfig,
  weightInputConfig,
  buttonConfig,
}) => (
  <InputGroup className="meal-input-field">
    <InputGroupAddon>
      <img
        src={avatarUrl}
        className="meal-input-field__avatar"
        alt=""
      />
    </InputGroupAddon>
    <FoodAutoComplete {...foodAutoCompleteConfig} />
    <Input type="number" placeholder="Weight" {...weightInputConfig} />
    <InputGroupAddon>g</InputGroupAddon>
    <InputGroupButton>
      <Button {...buttonConfig} />
    </InputGroupButton>
  </InputGroup>
);

MealInputField.propTypes = {
  avatarUrl: PropTypes.string,
  foodAutoCompleteConfig: PropTypes.shape({
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
  }),
  weightInputConfig: PropTypes.shape({
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.number,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
  }),
  buttonConfig: PropTypes.shape({
    children: PropTypes.node,
    color: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
  }),
};

MealInputField.defaultProps = {
  avatarUrl: '',
  foodAutoCompleteConfig: {
    disabled: false,
    onChange: () => {},
  },
  weightInputConfig: PropTypes.shape({
    placeholder: '',
    type: 'number',
    value: 0,
    disabled: false,
    onChange: () => {},
  }),
  buttonConfig: PropTypes.shape({
    children: null,
    color: null,
    onClick: () => {},
    disabled: false,
  }),
};

export default MealInputField;
