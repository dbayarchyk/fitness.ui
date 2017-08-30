import React from 'react';
import PropTypes from 'prop-types';
import {
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import './MealPlan.css';
import MealInputField from '../MealInputField/MealInputField';

const MealPlan = ({ mealPlan, foods }) => (
  <div className="meal-plan">
    <ListGroup>
      {
        mealPlan.foods.map((mealFood, foodIndex) => (
          <ListGroupItem className="meal-plan__food" key={foodIndex}>
            <MealInputField 
                        avatarUrl={mealFood.product.avatarUrl}
                        foodAutoCompleteConfig={{
                          selected: [ mealFood.product ],
                          disabled: true
                        }}
                        weightInputConfig={{
                          className: 'meal-plan__food__name',
                          value: mealFood.weight,
                          disabled: true
                        }}
                        buttonConfig={{
                          className: 'meal-plan__food__marker',
                          color: foods.find(food => food.product._id === mealFood.product._id && food.weight === mealFood.weight) ? 'success' : 'warning',
                          children: foods.find(food => food.product._id === mealFood.product._id && food.weight === mealFood.weight)
                            ? <FontAwesome name="check"/>
                            : <FontAwesome name="exclamation"/>,
                        }}
                      />
          </ListGroupItem>
        ))
      }
    </ListGroup>
  </div>
);

MealPlan.propTypes = {
  mealPlan: PropTypes.object.isRequired,
}

export default MealPlan;