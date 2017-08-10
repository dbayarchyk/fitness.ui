import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
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
    console.log(meal);
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
          <Col sm="12" md="6">
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

const mapStateToProps = state => ({
  userId: state.auth.currentUser._id
});

export default connect(mapStateToProps)(DailyFoodManageWithData);
