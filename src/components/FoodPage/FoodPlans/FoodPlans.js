import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import {
  Row,
  Col
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import './FoodPlans.css';
import Spinner from '../../common/Spinner/Spinner';
import FoodPlanCard from './components/FoodPlanCard/FoodPlanCard';

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

class FoodPlans extends Component {
  changeUserFoodPlan = foodPlan => this.props.updateUser({
    variables: {
      id: this.props.userId,
      data: { foodPlan, }
    }
  })
    .then(data => this.props.data.refetch());

  render() {
    if (this.props.data.loading) {
      return <Spinner isLoading={this.props.data.loading} />
    }
    
    return (
      <div>
        <div>
          Toolbar
        </div>
        <div>
          <Row>
            {
              this.props.data.foodPlans.map((foodPlan, foodPlanIndex) => (
                <Col xs="12" sm="12" md="3" lg="4" key={foodPlanIndex}>
                  <FoodPlanCard
                    className={
                      !!this.props.data.user.foodPlan && this.props.data.user.foodPlan._id === foodPlan._id 
                        ? 'food-plan__card--selected' : ''
                    }
                    foodPlan={foodPlan}
                    headerRightButton={
                      !!this.props.data.user.foodPlan && this.props.data.user.foodPlan._id === foodPlan._id 
                        ? {
                          onClick: () => this.changeUserFoodPlan(null),
                          children: <FontAwesome name="minus"/>
                        }
                        : {
                          onClick: () => this.changeUserFoodPlan(foodPlan._id),
                          children: <FontAwesome name="plus"/>
                        }
                    }
                  />
                </Col>
              ))
            }
          </Row>
        </div>
      </div>
    )
  }
}

const FoodPlansWithData = graphql(foodPlansAndUser, {
  options: ({ userId }) => ({
    variables: {
      userId,
    },
    fetchPolicy: 'network-only'
  })
})(FoodPlans);

const FoodPlansWithDataAndMutation = graphql(updateUser, { name: 'updateUser' })(FoodPlansWithData);

const mapStateToProps = state => ({
  userId: state.auth.currentUser._id
});

export default connect(mapStateToProps)(FoodPlansWithDataAndMutation);