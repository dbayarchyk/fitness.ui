import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import './FoodPlans.css';
import FoodPlanCard from '../FoodPlanCard/FoodPlanCard';

const FoodPlans = ({ foodPlans, changeUserFoodPlan, userFoodPlanId }) => (
  <div>
    <div>
      Toolbar
    </div>
    <div>
      <Row>
        {
          foodPlans.map(foodPlan => (
            <Col xs="12" sm="12" md="3" lg="4" key={foodPlan._id}>
              <FoodPlanCard
                className={
                  userFoodPlanId === foodPlan._id
                    ? 'food-plan__card--selected' : ''
                }
                {...foodPlan}
                headerRightButton={
                  userFoodPlanId === foodPlan._id
                    ? {
                      onClick: () => changeUserFoodPlan(null),
                      children: <FontAwesome name="minus" />,
                    }
                    : {
                      onClick: () => changeUserFoodPlan(foodPlan._id),
                      children: <FontAwesome name="plus" />,
                    }
                }
              />
            </Col>
          ))
        }
      </Row>
    </div>
  </div>
);

FoodPlans.propTypes = {
  foodPlans: PropTypes.array,
  changeUserFoodPlan: PropTypes.func.isRequired,
  userFoodPlanId: PropTypes.string,
};

FoodPlans.defaultProps = {
  foodPlans: [],
  userFoodPlanId: null,
};

export default FoodPlans;
