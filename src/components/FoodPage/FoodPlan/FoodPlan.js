import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import {
  Row,
  Col
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import './FoodPlan.css';
import Spinner from '../../common/Spinner/Spinner';
import MealsOverview from './components/MealsOverview/MealsOverview';

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

class FoodPlan extends Component {
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

    const { foodPlan } = this.props.data;
    
    return (
      <div className="food-plan">

        <div className="food-plan__avatar-container">
          <img src={foodPlan.avatarUrl} className="food-plan__avatar"/>
        </div>

        <div className="food-plan__nutrition-rate">
          <div className="food-plan__nutrition-rate__field">
            <div className="food-plan__nutrition-rate__field__key">
              Calorific value:
            </div>
            <div className="food-plan__nutrition-rate__field__value">
              {foodPlan.calorificValue}kcal
            </div>
          </div>
          <div className="food-plan__nutrition-rate__field">
            <div className="food-plan__nutrition-rate__field__key">
              Proteins:
            </div>
            <div className="food-plan__nutrition-rate__field__value">
              {foodPlan.nutrients.proteins}g
            </div>
          </div>
          <div className="food-plan__nutrition-rate__field">
            <div className="food-plan__nutrition-rate__field__key">
              Carbohydrates:
            </div>
            <div className="food-plan__nutrition-rate__field__value">
              {foodPlan.nutrients.carbohydrates}g
            </div>
          </div>
          <div className="food-plan__nutrition-rate__field">
            <div className="food-plan__nutrition-rate__field__key">
              Fats:
            </div>
            <div className="food-plan__nutrition-rate__field__value">
              {foodPlan.nutrients.fats}g
            </div>
          </div>
        </div>

        <div className="food-plan__meals">
          <MealsOverview meals={foodPlan.meals}/>
        </div>

      </div>
    )
  }
}

const FoodPlanWithData = graphql(foodPlanAndUser, {
  options: ({ userId, match }) => ({
    variables: {
      userId,
      foodPlanId: match.params.id
    },
    fetchPolicy: 'network-only'
  })
})(FoodPlan);

const FoodPlanWithDataAndMutation = graphql(updateUser, { name: 'updateUser' })(FoodPlanWithData);

const mapStateToProps = state => ({
  userId: state.auth.currentUser._id
});

export default connect(mapStateToProps)(FoodPlanWithDataAndMutation);