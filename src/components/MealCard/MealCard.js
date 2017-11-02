import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBlock,
  CardTitle,
  CardSubtitle,
  ListGroup,
  ListGroupItem,
  Button,
} from 'reactstrap';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';

import './MealCard.css';

const MealCard = ({ meal, onEditClick, onCloseClick }) => (
  <Card block>
    <CardTitle className="meal__card__title">
      <div className="meal__card__title__date">
        {moment(meal.date).format('h:mm a')}
      </div>
      {
        onCloseClick && (
          <div className="meal__card__title__close-button">
            <FontAwesome name="close" onClick={() => onCloseClick(meal)} />
          </div>
        )
      }
    </CardTitle>
    <CardSubtitle>Calorific value: {meal.calorificValue} kcal</CardSubtitle>

    <CardBlock>
      <ListGroup>
        {
          meal.foods.map(({ product, _id, weight }) => (
            <ListGroupItem key={_id}>
              <img
                className="meal-item__avatar"
                src={product.avatarUrl}
                alt="Meal avatar"
              />
              {product.name}: {weight}g
            </ListGroupItem>
          ))
        }
      </ListGroup>
    </CardBlock>

    <CardBlock>
      <div className="nutrients">
        <div className="nutrients__field">
          <div className="nutrients__key">Proteins</div>
          <div className="nutrients__value">{meal.nutrients.proteins}g</div>
        </div>
        <div className="nutrients__field">
          <div className="nutrients__key">Carbohydrates</div>
          <div className="nutrients__value">{meal.nutrients.carbohydrates}g</div>
        </div>
        <div className="nutrients__field">
          <div className="nutrients__key">Fats</div>
          <div className="nutrients__value">{meal.nutrients.fats}g</div>
        </div>
      </div>
    </CardBlock>

    <CardBlock>
      <Button color="primary" block onClick={() => onEditClick(meal)}>Edit</Button>
    </CardBlock>
  </Card>
);

MealCard.propTypes = {
  meal: PropTypes.object.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onCloseClick: PropTypes.func,
};

MealCard.defaultProps = {
  onCloseClick: null,
};

export default MealCard;
