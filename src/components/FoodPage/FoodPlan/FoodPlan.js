import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import FontAwesome from 'react-fontawesome';

import './FoodPlan.css';
import { 
  CharacteristicField,
  CharacteristicKey,
  CharacteristicValue
} from '../../common/CharacteristicField/CharacteristicField';
import FCard from '../../common/Card/Card';
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
      <FCard
        header={{
          title: { children: foodPlan.name },
          rightButton: !!this.props.data.user.foodPlan && this.props.data.user.foodPlan._id === foodPlan._id
            ? {
              onClick: () => this.changeUserFoodPlan(null),
              children: <FontAwesome name="minus"/>
            }
            : {
              onClick: () => this.changeUserFoodPlan(foodPlan._id),
              children: <FontAwesome name="plus"/>
            }
        }}

        img={{ src: foodPlan.avatarUrl }}

        body={{
          children: [
            <div className="food-plan__nutrition-rate">
              <CharacteristicField>
                <CharacteristicKey xs="8">Calorific value</CharacteristicKey>
                <CharacteristicValue xs="4">{foodPlan.calorificValue}kcal</CharacteristicValue>
              </CharacteristicField>

              <CharacteristicField>
                <CharacteristicKey xs="8">Proteins</CharacteristicKey>
                <CharacteristicValue xs="4">{foodPlan.nutrients.proteins}g</CharacteristicValue>
              </CharacteristicField>

              <CharacteristicField>
                <CharacteristicKey xs="8">Carbohydrates</CharacteristicKey>
                <CharacteristicValue xs="4">{foodPlan.nutrients.carbohydrates}g</CharacteristicValue>
              </CharacteristicField>

              <CharacteristicField>
                <CharacteristicKey xs="8">Fats</CharacteristicKey>
                <CharacteristicValue xs="4">{foodPlan.nutrients.fats}g</CharacteristicValue>
              </CharacteristicField>
            </div>,

            <div className="food-plan__meals">
              <MealsOverview meals={foodPlan.meals}/>
            </div>
          ]
        }}
      />
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