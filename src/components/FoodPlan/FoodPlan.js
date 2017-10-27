import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './FoodPlan.css';
import {
  CharacteristicField,
  CharacteristicKey,
  CharacteristicValue,
} from '../common/CharacteristicField/CharacteristicField';
import FCard from '../common/Card/Card';
import MealsOverview from '../MealsOverview/MealsOverview';

const FoodPlan = ({
  _id,
  name,
  avatarUrl,
  calorificValue,
  nutrients,
  meals,
  changeUserFoodPlan,
  userFoodPlanId,
}) => (
  <FCard
    header={{
      title: { children: name },
      rightButton: userFoodPlanId === _id
        ? {
          onClick: () => changeUserFoodPlan(null),
          children: <FontAwesome name="minus" />,
        }
        : {
          onClick: () => changeUserFoodPlan(_id),
          children: <FontAwesome name="plus" />,
        },
    }}

    img={{ src: avatarUrl }}

    body={{
      children: [
        <div className="food-plan__nutrition-rate">
          <CharacteristicField>
            <CharacteristicKey xs="8">Calorific value</CharacteristicKey>
            <CharacteristicValue xs="4">{calorificValue}kcal</CharacteristicValue>
          </CharacteristicField>

          <CharacteristicField>
            <CharacteristicKey xs="8">Proteins</CharacteristicKey>
            <CharacteristicValue xs="4">{nutrients.proteins}g</CharacteristicValue>
          </CharacteristicField>

          <CharacteristicField>
            <CharacteristicKey xs="8">Carbohydrates</CharacteristicKey>
            <CharacteristicValue xs="4">{nutrients.carbohydrates}g</CharacteristicValue>
          </CharacteristicField>

          <CharacteristicField>
            <CharacteristicKey xs="8">Fats</CharacteristicKey>
            <CharacteristicValue xs="4">{nutrients.fats}g</CharacteristicValue>
          </CharacteristicField>
        </div>,

        <div className="food-plan__meals">
          <MealsOverview meals={meals} />
        </div>,
      ],
    }}
  />
);

FoodPlan.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string,
  avatarUrl: PropTypes.string,
  calorificValue: PropTypes.number,
  nutrients: PropTypes.shape({
    proteins: PropTypes.number,
    carbohydrates: PropTypes.number,
    fats: PropTypes.number,
  }),
  meals: PropTypes.array,
  changeUserFoodPlan: PropTypes.func,
  userFoodPlanId: PropTypes.string,
};

FoodPlan.defaultProps = {
  name: '',
  avatarUrl: '',
  calorificValue: 0,
  nutrients: PropTypes.shape({
    proteins: 0,
    carbohydrates: 0,
    fats: 0,
  }),
  meals: [],
  changeUserFoodPlan: () => {},
  userFoodPlanId: '',
};

export default FoodPlan;
