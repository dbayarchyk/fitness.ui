import React from 'react';
import PropTypes from 'prop-types';
import {
  Badge,
  Col,
  Row,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

import './MealsOverview.css';

const MealsOverview = ({ meals }) => (
  <ListGroup className="meals-overview">
    {
      meals.map((meal, mealIndex) => (
        <ListGroupItem className="meal-item" key={meal._id}>
          <div className="meal-item__title-container">
            <h5 className="meal-item__title">{`${mealIndex + 1} `} meal</h5>
          </div>

          <ListGroup className="meal-item__foods">
            <Row>
              {
                meal.foods.map(food => (
                  <Col xs="12" sm="6" md="4" lg="3" key={food._id}>
                    <ListGroupItem className="meal-item__food">
                      <div className="meal-item__food__avatar-container">
                        <img
                          src={food.product.avatarUrl}
                          className="meal-item__food__avatar"
                          alt="Meal avatar"
                        />
                      </div>

                      <div className="meal-item__food__info">
                        <div className="meal-item__food__info__name">
                          {food.product.name}
                        </div>

                        <div className="meal-item__food__info__weight">
                          {food.weight}g
                        </div>
                      </div>
                    </ListGroupItem>
                  </Col>
                ))
              }
            </Row>
          </ListGroup>

          <div className="meal-item__nutrition-rate">
            <Badge color="success" pill className="meal-item__nutrition-rate__pill">Calorific Value: {meal.calorificValue}kcal</Badge>
            <Badge color="info" className="meal-item__nutrition-rate__pill">Proteins: {meal.nutrients.proteins}g</Badge>
            <Badge color="info" className="meal-item__nutrition-rate__pill">Carbohydrates: {meal.nutrients.carbohydrates}g</Badge>
            <Badge color="info" className="meal-item__nutrition-rate__pill">Fats: {meal.nutrients.fats}g</Badge>
          </div>
        </ListGroupItem>
      ))
    }
  </ListGroup>
);

MealsOverview.propTypes = {
  meals: PropTypes.array,
};

MealsOverview.defaultProps = {
  meals: [],
};

export default MealsOverview;
