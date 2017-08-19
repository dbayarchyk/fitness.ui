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

const dailyUserFoodHistory = gql`
  query dailyUserFoodHistory($userId: ID!) {
    dailyUserFoodHistory(userId: $userId) {
      _id,
      date,
      foods {
        food {
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
  }
`;

const addUserFoodHistoryItem = gql`
  mutation addUserFoodHistoryItem($userId: ID!, $data: FoodHistoryInput!) {
    addUserFoodHistoryItem(userId: $userId, data: $data) {
      _id
    }
  }
`;

const updateUserFoodHistoryItem = gql`
  mutation updateUserFoodHistoryItem($userId: ID!, $data: FoodHistoryInput!) {
    updateUserFoodHistoryItem(userId: $userId, data: $data) {
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

    meal.foods = meal.foods.map(meal => ({
      food: meal.food._id,
      weight: meal.weight
    }));

    const mutationOptions = {
      variables: {
        userId: this.props.userId,
        data: {
          ...normalizeMutationObject(meal),
          nutrients: normalizeMutationObject(meal.nutrients)
        }
      }
    };

    const mutate = this.state.selectedMeal 
      ? this.props.addUserFoodHistoryItem 
      : this.props.updateUserFoodHistoryItem;

    mutate(mutationOptions)
      .then(data => this.props.data.refetch())
  }

  render() {
    if (this.props.data.loading) {
      return <Spinner isLoading={this.props.data.loading} />
    }

    return (
      <div>
        <Row>
          {
            this.props.data.dailyUserFoodHistory.map(foodHistoryItem => (
              <Col key={foodHistoryItem._id} sm="12" md="6">
                <MealCard meal={foodHistoryItem} onEditClick={this.toggleMealModal}/>
              </Col>
            ))
          }
          <Col style={{ flex: 1 }}>
            <Button outline color="primary" className="add-new-meal-button" onClick={() => this.toggleMealModal()}>
              <FontAwesome name="plus-square"/>
            </Button>
          </Col>
        </Row>

        <MealModal
          isOpen={this.state.isFoodModalOpen}
          meal={this.state.selectedMeal}
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
  graphql(updateUserFoodHistoryItem, { name: 'updateUserFoodHistoryItem' })
)(DailyFoodManageWithData);

const mapStateToProps = state => ({
  userId: state.auth.currentUser._id
});

export default connect(mapStateToProps)(DailyFoodManageWithDataAndMutations);