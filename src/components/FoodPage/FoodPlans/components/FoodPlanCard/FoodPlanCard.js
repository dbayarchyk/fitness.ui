import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import {
  Badge,
  CardBlock
} from 'reactstrap';

import './FoodPlanCard.css';
import FCard from '../../../../common/Card/Card';

const FoodPlanCard = ({ foodPlan, headerRightButton, className }) => (
  <FCard 
    header={{
      title: { children: <Link to={`/app/food/food-plan/${foodPlan._id}`}>{foodPlan.name}</Link> },
      rightButton: headerRightButton
    }}

    img={{ src: foodPlan.avatarUrl }}

    body={{
      children: <CardBlock className="food-plan__card__daily-nutrition-rate">
        <Badge color="success" pill className="food-plan__card__daily-nutrition-rate__pill">Calorific Value: {foodPlan.calorificValue}kcal</Badge>
        <Badge color="info" pill className="food-plan__card__daily-nutrition-rate__pill">Proteins: {foodPlan.nutrients.proteins}g</Badge>
        <Badge color="info" pill className="food-plan__card__daily-nutrition-rate__pill">Carbohydrates: {foodPlan.nutrients.carbohydrates}g</Badge>
        <Badge color="info" pill className="food-plan__card__daily-nutrition-rate__pill">Fats: {foodPlan.nutrients.fats}g</Badge>
      </CardBlock>
    }}
  />
);

FoodPlanCard.propTypes = {
  className: PropTypes.string,
  foodPlan: PropTypes.object.isRequired,
  headerRightButton: PropTypes.object
};

export default FoodPlanCard;
