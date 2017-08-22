import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import {
  Card,
  CardBlock,
  CardTitle,
  CardSubtitle,
  Progress
} from 'reactstrap';

const getUserData = gql`
  query user($id: ID!) {
    user(_id: $id) {
      age,
      weight,
      sex,
      height
    }
  }
`;

const BMR_CONSTANTS_BY_SEX = {
  male: {
    coefficient: 88.36,
    weight: 13.4,
    height: 4.8,
    age: 5.7
  },
  female: {
    coefficient: 447.6,
    weight: 9.2,
    height: 3.1,
    age: 4.3
  }
};

// TODO: get this data from server.
const ACTIVITY_COEFFICIENT = 1.55;

const getBMR = ({ sex, weight, height, age }) =>
  BMR_CONSTANTS_BY_SEX[sex].coefficient 
  + BMR_CONSTANTS_BY_SEX[sex].weight * weight 
  + BMR_CONSTANTS_BY_SEX[sex].height * height
  - BMR_CONSTANTS_BY_SEX[sex].age * age;

const getRelativeValue = (value, commonValue) =>
  Math.round(value * 100 / commonValue);

const CommonFoodStatistic = ({ calorificValue, nutrients , data }) => {
  if (data.loading) {
    return null;
  }

  const commonCalorificValue = Math.round(getBMR(data.user) * ACTIVITY_COEFFICIENT);
  
  const commonNutrients = {
    proteins: Math.round(commonCalorificValue / 24),
    carbohydrates: Math.round(commonCalorificValue / 6),
    fats: Math.round(commonCalorificValue / 54)
  };

  return (
    <Card block>
      <CardTitle>Statistic</CardTitle>
      <CardSubtitle>
        Daily Calorific Value: 
        <Progress value={getRelativeValue(calorificValue, commonCalorificValue)}>
          {calorificValue} / {commonCalorificValue} kcal
        </Progress>
      </CardSubtitle>

      <CardBlock>
        <div className="nutrients">
          <div>
            <div>Proteins ({commonNutrients.proteins}g)</div>
            <div>
              <Progress value={getRelativeValue(nutrients.proteins, commonNutrients.proteins)}>
                {nutrients.proteins}g
              </Progress>
            </div>
          </div>
          <div>
            <div>Carbohydrates ({commonNutrients.carbohydrates}g)</div>
            <div>
              <Progress value={getRelativeValue(nutrients.carbohydrates, commonNutrients.carbohydrates)}>
                {nutrients.carbohydrates}g
              </Progress>
            </div>
          </div>
          <div>
            <div>Fats ({commonNutrients.fats}g)</div>
            <div>
              <Progress value={getRelativeValue(nutrients.fats, commonNutrients.fats)}>
                {nutrients.fats}g
              </Progress>
            </div>
          </div>
        </div>
      </CardBlock>
    </Card>
  );
};

const CommonFoodStatisticWithData = graphql(getUserData, {
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