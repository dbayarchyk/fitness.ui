import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBlock,
  CardTitle,
  Badge
} from 'reactstrap';
import dateFormat from 'dateformat';
import FontAwesome from 'react-fontawesome';

import './FoodPlanCard.css';

const FoodPlanCard = ({ foodPlan }) => (
  <Card block className="food-plan__card">
    <CardTitle className="food-plan__card__title">
      {foodPlan.name}
    </CardTitle>

    <CardBlock className="food-plan__card__avatar-container">
      <img className="food-plan__card__avatar" src={foodPlan.avatarUrl} />
    </CardBlock>

    <CardBlock>
      <div className="food-plan__card__daily-nutrition-rate">
        <Badge color="success" pill className="food-plan__card__daily-nutrition-rate__pill">Calorific Value: {foodPlan.calorificValue}kcal</Badge>
        <Badge color="info" pill className="food-plan__card__daily-nutrition-rate__pill">Proteins: {foodPlan.nutrients.proteins}g</Badge>
        <Badge color="info" pill className="food-plan__card__daily-nutrition-rate__pill">Carbohydrates: {foodPlan.nutrients.carbohydrates}g</Badge>
        <Badge color="info" pill className="food-plan__card__daily-nutrition-rate__pill">Fats: {foodPlan.nutrients.fats}g</Badge>
      </div>
    </CardBlock>
  </Card>
);

FoodPlanCard.propTypes = {
  foodPlan: PropTypes.object.isRequired,
};

export default FoodPlanCard;
