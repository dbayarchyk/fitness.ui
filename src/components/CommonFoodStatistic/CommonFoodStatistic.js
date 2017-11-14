import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBlock,
  CardTitle,
  CardSubtitle
} from 'reactstrap';

import MultiProgress from '../common/MultiProgress/MultiProgress';

const CommonFoodStatistic = ({ calorificValue, nutrients , userDailyNutritionRate }) => (
  <Card block>
    <CardTitle>Statistic</CardTitle>
    <CardSubtitle>
      Daily Calorific Value: 
      <MultiProgress value={calorificValue} commonValue={userDailyNutritionRate.calorificValue} units="kcal"/>
    </CardSubtitle>

    <CardBlock>
      <div>
        <div>
          <div>Proteins ({userDailyNutritionRate.nutrients.proteins}g)</div>
          <div>
            <MultiProgress value={nutrients.proteins} commonValue={userDailyNutritionRate.nutrients.proteins} units="g"/>
          </div>
        </div>
        <div>
          <div>Carbohydrates ({userDailyNutritionRate.nutrients.carbohydrates}g)</div>
          <div>
            <MultiProgress value={nutrients.carbohydrates} commonValue={userDailyNutritionRate.nutrients.carbohydrates} units="g"/>
          </div>
        </div>
        <div>
          <div>Fats ({userDailyNutritionRate.nutrients.fats}g)</div>
          <div>
            <MultiProgress value={nutrients.fats} commonValue={userDailyNutritionRate.nutrients.fats} units="g"/>
          </div>
        </div>
      </div>
    </CardBlock>
  </Card>
);

CommonFoodStatistic.propTypes = {
  calorificValue: PropTypes.number,
  nutrients: PropTypes.shape({
    proteins: PropTypes.number,
    carbohydrates: PropTypes.number,
    fats: PropTypes.number,
  }),
  userDailyNutritionRate: PropTypes.shape({
    calorificValue: PropTypes.number,
    nutrients: PropTypes.shape({
      proteins: PropTypes.number,
      carbohydrates: PropTypes.number,
      fats: PropTypes.number,
    }),
  }),
};

CommonFoodStatistic.defaultProps = {
  calorificValue: 1,
  nutrients: {
    proteins: 1,
    carbohydrates: 1,
    fats: 1,
  },
  userDailyNutritionRate: {
    calorificValue: 1,
    nutrients: {
      proteins: 1,
      carbohydrates: 1,
      fats: 1,
    },
  },
};

export default CommonFoodStatistic;