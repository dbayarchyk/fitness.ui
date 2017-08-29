import React, { Component } from 'react';
import {
  Row,
  Col
} from 'reactstrap';

import './FoodPlans.css';
import FoodPlanCard from './components/FoodPlanCard/FoodPlanCard';

const mockFoodPlan = {
  name: 'Food plan',
  avatarUrl: 'https://cdn0.iconfinder.com/data/icons/profession-and-occupation-icons/110/avatar_occupation_profile_cook_kitchener_flunkey_food-512.png',
  calorificValue: 2500,
  nutrients: {
    proteins: 1,
    carbohydrates: 2,
    fats: 1,
  }
}

class FoodPlans extends Component {
  render() {
    return (
      <div>
        <div>
          Toolbar
        </div>
        <div>
          <Row>
            <Col xs="12" sm="12" md="3" lg="4">
              <FoodPlanCard foodPlan={mockFoodPlan}/>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default FoodPlans;