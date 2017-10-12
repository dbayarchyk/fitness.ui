import React from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import {
  Card,
  CardBlock,
  CardTitle,
  CardSubtitle
} from 'reactstrap';

import MultiProgress from './components/MultiProgress/MultiProgress';

const getUserDailyNutritionRate = gql`
  query userDailyNutritionRate($id: ID!) {
    userDailyNutritionRate(_id: $id) {
      calorificValue,
      nutrients {
        proteins,
        carbohydrates,
        fats
      }
    }
  }
`;

const CommonFoodStatistic = ({ calorificValue, nutrients , data }) => {
  if (data.loading) {
    return null;
  }

  const userDailyNutritionRate = data.userDailyNutritionRate;  

  return (
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
};

const CommonFoodStatisticWithData = graphql(getUserDailyNutritionRate, {
  options: ({ userId }) => ({
    variables: {
      id: userId
    },
    fetchPolicy: 'network-only'
  })
})(CommonFoodStatistic);

const mapStateToProps = state => ({
  userId: state.auth.currentUser._id
});

export default connect(mapStateToProps)(CommonFoodStatisticWithData);