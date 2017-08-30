import React from 'react';
import { gql, graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import {
  Card,
  CardBlock,
  CardTitle,
  Badge
} from 'reactstrap';

import './FoodPlanCard.css';

const FoodPlanCard = ({ foodPlan, titleRightIcon, className }) => (
  <Card block className="food-plan__card" className={className}>
    <CardTitle className="food-plan__card__title">
      <div className="food-plan__card__title__header">
        {foodPlan.name}
      </div>
      <div>
        { titleRightIcon }
      </div>
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
  className: PropTypes.string,
  foodPlan: PropTypes.object.isRequired,
  titleRightIcon: PropTypes.node.isRequired
};

export default FoodPlanCard;
