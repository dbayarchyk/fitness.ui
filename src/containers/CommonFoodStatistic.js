import React from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';

import CommonFoodStatistic from '../components/CommonFoodStatistic/CommonFoodStatistic';

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

const CommonFoodStatisticContainer = ({ calorificValue, nutrients , data }) => {
  if (data.loading) {
    return null;
  }

  const userDailyNutritionRate = data.userDailyNutritionRate;  

  return (
    <CommonFoodStatistic
      calorificValue={calorificValue}
      nutrients={nutrients}
      userDailyNutritionRate={userDailyNutritionRate}
    />
  );
};

const CommonFoodStatisticWithData = graphql(getUserDailyNutritionRate, {
  options: ({ userId }) => ({
    variables: {
      id: userId
    },
    fetchPolicy: 'network-only'
  })
})(CommonFoodStatisticContainer);

const mapStateToProps = state => ({
  userId: state.auth.currentUser._id
});

export default connect(mapStateToProps)(CommonFoodStatisticWithData);