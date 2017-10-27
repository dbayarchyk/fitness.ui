import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';

import Spinner from '../components/common/Spinner/Spinner';
import FoodPlans from '../components/FoodPlans/FoodPlans';

const foodPlansAndUser = gql`
  query foodPlansAndUser($userId: ID!) {
    foodPlans {
      _id,
      name,
      avatarUrl,
      nutrients {
        proteins,
        carbohydrates,
        fats
      },
      calorificValue
    },
    user(_id: $userId) {
      foodPlan {
        _id
      }
    }
  }
`;

const updateUser = gql`
  mutation updateUser($id: ID!, $data: UserInput!) {
    updateUser(_id: $id, data: $data) {
      _id
    }
  }
`;

class FoodPlansContainer extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
  };

  changeUserFoodPlan = foodPlan => this.props.updateUser({
    variables: {
      id: this.props.userId,
      data: { foodPlan },
    },
  })
    .then(() => this.props.data.refetch());

  render() {
    if (this.props.data.loading) {
      return <Spinner isLoading={this.props.data.loading} />;
    }

    return (
      <FoodPlans
        foodPlans={this.props.data.foodPlans}
        userFoodPlanId={this.props.data.user.foodPlan && this.props.data.user.foodPlan._id}
        changeUserFoodPlan={this.changeUserFoodPlan}
      />
    );
  }
}

const FoodPlansWithData = graphql(foodPlansAndUser, {
  options: ({ userId }) => ({
    variables: { userId },
    fetchPolicy: 'network-only',
  }),
})(FoodPlansContainer);

const FoodPlansWithDataAndMutation = graphql(updateUser, { name: 'updateUser' })(FoodPlansWithData);

const mapStateToProps = state => ({
  userId: state.auth.currentUser._id,
});

export default connect(mapStateToProps)(FoodPlansWithDataAndMutation);
