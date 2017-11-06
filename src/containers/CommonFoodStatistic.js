import React from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';

import withLoading from '../utils/withLoading';
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

const CommonFoodStatisticWithData = graphql(getUserDailyNutritionRate, {
  options: ({ userId }) => ({
    variables: {
      id: userId
    },
    fetchPolicy: 'network-only'
  }),
  props: ({ data: { loading, userDailyNutritionRate } }) => ({
    isLoading: loading,
    userDailyNutritionRate,
  }),
})(withLoading(CommonFoodStatistic));

const mapStateToProps = state => ({
  userId: state.auth.currentUser._id
});

export default connect(mapStateToProps)(CommonFoodStatisticWithData);