import React from 'react';
import {
  Card,
  CardBlock,
  CardTitle,
  CardSubtitle
} from 'reactstrap';

import MultiProgress from '../MultiProgress/MultiProgress';

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

export default CommonFoodStatistic;