import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Button,
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import './DailyFoodManage.css';
import MealCard from '../MealCard/MealCard';
import MealModal from '../MealModal/MealModal';
import CommonFoodStatistic from '../../containers/CommonFoodStatistic';

const DailyFoodManage = ({
  selectedMeal,
  dailyUserFoodHistory,
  isFoodModalOpen,
  toggleMealModal,
  submitMealModal,
  userFoodPlan,
  removeFoodHistoryItem,
  dailyCalorificValue,
  dailyNutrients,
}) => {
  const mealIndex = selectedMeal
    ? dailyUserFoodHistory.findIndex(foodHistoryItem => foodHistoryItem._id === selectedMeal._id)
    : dailyUserFoodHistory.length;

  const mealPlan = userFoodPlan && userFoodPlan.meals[mealIndex];

  return (
    <div>
      <Row>
        <Col xs="12" sm="12" md="6" lg="4" className="no-float">
          <CommonFoodStatistic
            calorificValue={dailyCalorificValue}
            nutrients={dailyNutrients}
          />
        </Col>
        {
          dailyUserFoodHistory.map(foodHistoryItem => (
            <Col key={foodHistoryItem._id} xs="12" sm="12" md="6" lg="4" className="no-float">
              <MealCard
                meal={foodHistoryItem}
                onEditClick={toggleMealModal}
                onCloseClick={removeFoodHistoryItem}
              />
            </Col>
          ))
        }
        <Col xs="12" sm="12" md="6" lg="4" className="no-float">
          <Button outline color="primary" className="add-new-meal-button" onClick={toggleMealModal}>
            <FontAwesome name="plus-square" />
          </Button>
        </Col>
      </Row>

      <MealModal
        isOpen={isFoodModalOpen}
        meal={selectedMeal}
        mealPlan={mealPlan}
        onSubmit={submitMealModal}
        toggle={toggleMealModal}
      />
    </div>
  );
};

DailyFoodManage.propTypes = {
  selectedMeal: PropTypes.object,
  dailyUserFoodHistory: PropTypes.array,
  isFoodModalOpen: PropTypes.bool,
  toggleMealModal: PropTypes.func,
  submitMealModal: PropTypes.func.isRequired,
  removeFoodHistoryItem: PropTypes.func.isRequired,
  userFoodPlan: PropTypes.object,
  dailyCalorificValue: PropTypes.object.isRequired,
  dailyNutrients: PropTypes.object.isRequired,
};

DailyFoodManage.defaultProps = {
  selectedMeal: null,
  dailyUserFoodHistory: [],
  isFoodModalOpen: false,
  toggleMealModal: () => {},
  userFoodPlan: null,
};

export default DailyFoodManage;
