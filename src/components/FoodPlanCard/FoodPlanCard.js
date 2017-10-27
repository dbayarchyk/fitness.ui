import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Badge,
  CardBlock,
} from 'reactstrap';

import './FoodPlanCard.css';
import FCard from '../common/Card/Card';

const FoodPlanCard = ({
  _id,
  name,
  avatarUrl,
  calorificValue,
  nutrients,
  headerRightButton,
}) => (
  <FCard
    header={{
      title: { children: <Link to={`/app/food/food-plan/${_id}`}>{name}</Link> },
      rightButton: headerRightButton,
    }}

    img={{ src: avatarUrl }}

    body={{
      children: (
        <CardBlock className="food-plan__card__daily-nutrition-rate">
          <Badge color="success" pill className="food-plan__card__daily-nutrition-rate__pill">Calorific Value: {calorificValue}kcal</Badge>
          <Badge color="info" pill className="food-plan__card__daily-nutrition-rate__pill">Proteins: {nutrients.proteins}g</Badge>
          <Badge color="info" pill className="food-plan__card__daily-nutrition-rate__pill">Carbohydrates: {nutrients.carbohydrates}g</Badge>
          <Badge color="info" pill className="food-plan__card__daily-nutrition-rate__pill">Fats: {nutrients.fats}g</Badge>
        </CardBlock>
      ),
    }}
  />
);

FoodPlanCard.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string,
  avatarUrl: PropTypes.string,
  calorificValue: PropTypes.number,
  nutrients: PropTypes.shape({
    proteins: PropTypes.number,
    carbohydrates: PropTypes.number,
    fats: PropTypes.number,
  }),
  headerRightButton: PropTypes.object,
};

FoodPlanCard.defaultProps = {
  name: '',
  avatarUrl: '',
  calorificValue: 0,
  nutrients: PropTypes.shape({
    proteins: 0,
    carbohydrates: 0,
    fats: 0,
  }),
  headerRightButton: null,
};

export default FoodPlanCard;
