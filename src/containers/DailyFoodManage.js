import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';

import Spinner from '../components/common/Spinner/Spinner';
import DailyFoodManage from '../components/DailyFoodManage/DailyFoodManage';

const dailyUserFoodHistory = gql`
  query dailyUserFoodHistory($userId: ID!) {
    dailyUserFoodHistory(userId: $userId) {
      _id,
      date,
      foods {
        product {
          _id,
          name,
          avatarUrl
        },
        weight
      }
      nutrients {
        proteins,
        carbohydrates,
        fats
      },
      calorificValue
    }
    user(_id: $userId) {
      foodPlan {
        _id,
        meals {
          foods {
            product {
              _id,
              avatarUrl,
              name
            },
            weight
          }
        }
      }
    }
  }
`;

const addUserFoodHistoryItem = gql`
  mutation addUserFoodHistoryItem($data: FoodHistoryInput!) {
    addUserFoodHistoryItem(data: $data) {
      _id
    }
  }
`;

const updateUserFoodHistoryItem = gql`
  mutation updateUserFoodHistoryItem($id: ID!, $data: FoodHistoryInput!) {
    updateUserFoodHistoryItem(_id: $id, data: $data) {
      _id
    }
  }
`;

const removeUserFoodHistoryItem = gql`
  mutation removeUserFoodHistoryItem($id: ID!) {
    removeUserFoodHistoryItem(_id: $id) {
      _id
    }
  }
`;

const normalizeMutationObject = ({ __typename, ...normalized = {} }) => normalized;

class DailyFoodManageContainer extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    addUserFoodHistoryItem: PropTypes.func.isRequired,
    updateUserFoodHistoryItem: PropTypes.func.isRequired,
    removeUserFoodHistoryItem: PropTypes.func.isRequired,
  };

  state = {
    isFoodModalOpen: false,
    selectedMeal: null,
  };

  getDailyCalorificValue() {
    let calorificValue = 0;

    this.props.data.dailyUserFoodHistory.forEach((foodHistoryItem) => {
      calorificValue += foodHistoryItem.calorificValue;
    });

    return calorificValue;
  }

  getDailyNutrients() {
    const nutrients = {
      proteins: 0,
      carbohydrates: 0,
      fats: 0,
    };

    this.props.data.dailyUserFoodHistory.forEach((foodHistoryItem) => {
      nutrients.proteins += foodHistoryItem.nutrients.proteins;
      nutrients.carbohydrates += foodHistoryItem.nutrients.carbohydrates;
      nutrients.fats += foodHistoryItem.nutrients.fats;
    });

    return nutrients;
  }

  toggleMealModal = (selectedMeal = null) => this.setState(oldState => ({
    isFoodModalOpen: !oldState.isFoodModalOpen,
    selectedMeal,
  }));

  submitMealModal = (meal) => {
    this.toggleMealModal();

    meal.foods = meal.foods.map(food => ({
      product: food.product._id,
      weight: food.weight,
    }));

    const mutationOptions = {
      variables: {
        id: meal._id,
        data: {
          userId: this.props.userId,
          ...normalizeMutationObject(meal),
          nutrients: meal.nutrients ? normalizeMutationObject(meal.nutrients) : meal.nutrients,
        },
      },
    };

    const mutate = this.state.selectedMeal
      ? this.props.updateUserFoodHistoryItem
      : this.props.addUserFoodHistoryItem;

    mutate(mutationOptions)
      .then(() => this.props.data.refetch());
  }

  removeFoodHistoryItem = meal =>
    this.props.removeUserFoodHistoryItem({ variables: { id: meal._id } })
      .then(() => this.props.data.refetch());

  render() {
    if (this.props.data.loading) {
      return <Spinner isLoading={this.props.data.loading} />;
    }

    return (
      <DailyFoodManage
        selectedMeal={this.state.selectedMeal}
        dailyUserFoodHistory={this.props.data.dailyUserFoodHistory}
        isFoodModalOpen={this.state.isFoodModalOpen}
        toggleMealModal={this.toggleMealModal}
        submitMealModal={this.submitMealModal}
        userFoodPlan={this.data.user.foodPlan}
        removeFoodHistoryItem={this.removeFoodHistoryItem}
        dailyCalorificValue={this.getDailyCalorificValue()}
        dailyNutrients={this.getDailyNutrients()}
      />
    );
  }
}

const DailyFoodManageWithData = graphql(dailyUserFoodHistory, {
  options: ({ userId }) => ({
    variables: { userId },
    fetchPolicy: 'network-only',
  }),
})(DailyFoodManageContainer);

const DailyFoodManageWithDataAndMutations = compose(
  graphql(addUserFoodHistoryItem, { name: 'addUserFoodHistoryItem' }),
  graphql(updateUserFoodHistoryItem, { name: 'updateUserFoodHistoryItem' }),
  graphql(removeUserFoodHistoryItem, { name: 'removeUserFoodHistoryItem' })
)(DailyFoodManageWithData);

const mapStateToProps = state => ({
  userId: state.auth.currentUser._id,
});

export default connect(mapStateToProps)(DailyFoodManageWithDataAndMutations);
