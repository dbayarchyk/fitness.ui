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
                <MealCard meal={foodHistoryItem}/>
              </Col>
            ))
          }
          <Col sm="12" md="6">
            <Button outline color="primary" className="add-new-meal-button">
              <FontAwesome name="plus-square"/>
            </Button>
          </Col>
        </Row>
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
