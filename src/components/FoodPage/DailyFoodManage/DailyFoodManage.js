import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';
import {
  Row,
  Col,
  Card,
  Button
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import './DailyFoodManage.css';
import Spinner from '../../common/Spinner/Spinner';
import MealCard from './components/MealCard/MealCard';
import MealModal from './components/MealModal/MealModal';
import CommonFoodStatistic from './components/CommonFoodStatistic/CommonFoodStatistic';

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

class DailyFoodManage extends Component {
  state = {
    isFoodModalOpen: false,
    selectedMeal: null
  };

  toggleMealModal = (selectedMeal = null) => this.setState(oldState => ({
    isFoodModalOpen: !oldState.isFoodModalOpen,
    selectedMeal: selectedMeal
  }));

  submitMealModal = meal => {
    this.toggleMealModal();

    meal.foods = meal.foods.map(food => ({
      product: food.product._id,
      weight: food.weight
    }));

    const mutationOptions = {
      variables: {
        id: meal._id,
        data: {
          userId: this.props.userId,
          ...normalizeMutationObject(meal),
          nutrients: meal.nutrients ? normalizeMutationObject(meal.nutrients) : meal.nutrients
        }
      }
    };

    const mutate = this.state.selectedMeal 
      ? this.props.updateUserFoodHistoryItem
      : this.props.addUserFoodHistoryItem;

    mutate(mutationOptions)
      .then(data => this.props.data.refetch())
  }

  removeFoodHistoryItem = meal => 
    this.props.removeUserFoodHistoryItem({ variables: { id: meal._id }})
      .then(data => this.props.data.refetch());

  getDailyCalorificValue() {
    let calorificValue = 0;

    this.props.data.dailyUserFoodHistory.forEach(foodHistoryItem => calorificValue += foodHistoryItem.calorificValue);

    return calorificValue;
  }

  getDailyNutrients() {
    let nutrients = {
      proteins: 0,
      carbohydrates: 0,
      fats: 0
    };

    this.props.data.dailyUserFoodHistory.forEach(foodHistoryItem => {
      nutrients.proteins += foodHistoryItem.nutrients.proteins;
      nutrients.carbohydrates += foodHistoryItem.nutrients.carbohydrates;
      nutrients.fats += foodHistoryItem.nutrients.fats;
    });

    return nutrients;
  }

  render() {
    if (this.props.data.loading) {
      return <Spinner isLoading={this.props.data.loading} />
    }

    const mealIndex = this.state.selectedMeal
      ? this.props.data.dailyUserFoodHistory
          .findIndex(foodHistoryItem => foodHistoryItem._id == this.state.selectedMeal._id)
      : this.props.data.dailyUserFoodHistory.length;

    const mealPlan = this.props.data.user.foodPlan && this.props.data.user.foodPlan.meals[mealIndex];

    return (
      <div>
        <Row>
          <Col xs="12" sm="12" md="6" lg="4">
            <CommonFoodStatistic 
              calorificValue={this.getDailyCalorificValue()}
              nutrients={this.getDailyNutrients()}
            />
          </Col>
          {
            this.props.data.dailyUserFoodHistory.map(foodHistoryItem => (
              <Col key={foodHistoryItem._id} xs="12" sm="12" md="6" lg="4">
                <MealCard 
                  meal={foodHistoryItem}
                  onEditClick={this.toggleMealModal}
                  onCloseClick={this.removeFoodHistoryItem}
                />
              </Col>
            ))
          }
          <Col xs="12" sm="12" md="6" lg="4">
            <Button outline color="primary" className="add-new-meal-button" onClick={() => this.toggleMealModal()}>
              <FontAwesome name="plus-square"/>
            </Button>
          </Col>
        </Row>

        <MealModal
          isOpen={this.state.isFoodModalOpen}
          meal={this.state.selectedMeal}
          mealPlan={mealPlan}
          onSubmit={this.submitMealModal}
          toggle={() => this.toggleMealModal()}
        />
      </div>
    )
  }
}

const DailyFoodManageWithData = graphql(dailyUserFoodHistory, {
  options: ({ userId }) => ({
    variables: {
      userId: userId
    },
    fetchPolicy: 'network-only'
  })
})(DailyFoodManage);

const DailyFoodManageWithDataAndMutations = compose(
  graphql(addUserFoodHistoryItem, { name: 'addUserFoodHistoryItem' }),
  graphql(updateUserFoodHistoryItem, { name: 'updateUserFoodHistoryItem' }),
  graphql(removeUserFoodHistoryItem, { name: 'removeUserFoodHistoryItem' })
)(DailyFoodManageWithData);

const mapStateToProps = state => ({
  userId: state.auth.currentUser._id
});

export default connect(mapStateToProps)(DailyFoodManageWithDataAndMutations);
