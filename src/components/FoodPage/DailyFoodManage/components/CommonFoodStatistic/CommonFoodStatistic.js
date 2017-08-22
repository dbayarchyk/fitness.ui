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

const getRelativeValorificValue = (calorificValue, commonCalorificValue) =>
  Math.round(calorificValue * 100 / commonCalorificValue);

const CommonFoodStatistic = ({ calorificValue, nutrients , data }) => data.loading ? null : (
  <Card block>
    <CardTitle>Statistic</CardTitle>
    <CardSubtitle>
      Daily Calorific Value: 
      <Progress value={getRelativeValorificValue(calorificValue, Math.round(getBMR(data.user) * ACTIVITY_COEFFICIENT))}>
        {calorificValue} / {Math.round(getBMR(data.user) * ACTIVITY_COEFFICIENT)}
      </Progress>
    </CardSubtitle>

    <CardBlock>
      <div className="nutrients">
        <div className="nutrients__field">
          <div className="nutrients__key">Proteins</div>
          <div className="nutrients__value">
            <Progress value={nutrients.fats}>
              {nutrients.proteins} / 
            </Progress>
          </div>
        </div>
        <div className="nutrients__field">
          <div className="nutrients__key">Carbohydrates</div>
          <div className="nutrients__value">
            <Progress value={nutrients.fats}>
            {nutrients.carbohydrates} / 
            </Progress>
          </div>
        </div>
        <div className="nutrients__field">
          <div className="nutrients__key">Fats</div>
          <div className="nutrients__value">
            <Progress value={nutrients.fats}>
              {nutrients.fats} / 
            </Progress>
          </div>
        </div>
      </div>
    </CardBlock>
  </Card>
);

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