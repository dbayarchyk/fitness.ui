import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import {
  Row,
  Col
} from 'reactstrap';
import Spinner from '../../common/Spinner/Spinner';

import './FoodPlans.css';
import FoodPlanCard from './components/FoodPlanCard/FoodPlanCard';

const foodPlans = gql`
  query foodPlans {
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
    }
  }
`;


class FoodPlans extends Component {
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
                  <FoodPlanCard foodPlan={foodPlan}/>
                </Col>
              ))
            }
          </Row>
        </div>
      </div>
    )
  }
}

const FoodPlansWithData = graphql(foodPlans, {
  options: () => ({
    fetchPolicy: 'network-only'
  })
})(FoodPlans);

export default FoodPlansWithData;