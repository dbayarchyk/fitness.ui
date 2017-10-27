import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';

import Spinner from '../components/common/Spinner/Spinner';
import FoodPlan from '../components/FoodPlan/FoodPlan';

const foodPlanAndUser = gql`
  query getData($userId: ID!, $foodPlanId: ID!) {
    foodPlan(_id: $foodPlanId) {
      _id,
      name,
      avatarUrl,
      meals {
        foods {
          product {
            _id,
            avatarUrl,
            name
          },
          weight
        },
        nutrients {
          proteins,
          carbohydrates,
          fats
        },
        calorificValue   
      },
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

class FoodPlanContainer extends Component {
  static propTypes = {
    updateUser: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
  }

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

    const { foodPlan, user } = this.props.data;

    return (
      <FoodPlan
        {...foodPlan}
        userFoodPlanId={user.foodPlan && user.foodPlan._id}
        changeUserFoodPlan={this.changeUserFoodPlan}
      />
    );
  }
}

const FoodPlanWithData = graphql(foodPlanAndUser, {
  options: ({ userId, match }) => ({
    variables: {
      userId,
      foodPlanId: match.params.id,
    },
    fetchPolicy: 'network-only',
  }),
})(FoodPlanContainer);

const FoodPlanWithDataAndMutation = graphql(updateUser, { name: 'updateUser' })(FoodPlanWithData);

const mapStateToProps = state => ({
  userId: state.auth.currentUser._id,
});

export default connect(mapStateToProps)(FoodPlanWithDataAndMutation);
