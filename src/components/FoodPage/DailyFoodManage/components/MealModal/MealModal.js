import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  Input,
  ListGroup,
  ListGroupItem,
  InputGroupButton
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import Typeahead from 'react-bootstrap-typeahead';

import './MealModal.css';
import FoodAutoComplete from './components/FoodAutoComplete/FoodAutoComplete';
import MealInputField from './components/MealInputField/MealInputField';

const emptyMealModel = {
  foods: []
}

const emptyFoodModel = {
  _id: null,
  name: '',
  avatarUrl: ''
};

const emptyNewMealModel = {
  food: emptyFoodModel,
  weight: 100
};

class MealModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    meal: PropTypes.object,
    className: PropTypes.string,
    toggle: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  state = {
    meal: emptyMealModel,
    newMealItem: emptyNewMealModel,
  }

  componentWillReceiveProps({ meal }) {
    // To update state when new props are received.
    this.state = {
      meal: meal || emptyMealModel,
      newMealItem: emptyNewMealModel
    };
  }

  updateMealItemFood = (food, mealItemIndex) => this.setState(oldState => {
    const newState = {
      meal: {
        ...oldState.meal,
        foods: [
          ...oldState.meal.foods.slice(0, mealItemIndex),
          {
            ...oldState.meal.foods[mealItemIndex],
            food: food || emptyFoodModel
          },
          ...oldState.meal.foods.slice(mealItemIndex + 1)
        ]
      }
    };

    return newState;
  });

  updateMealItemWeight = (weight, mealItemIndex) => this.setState(oldState => {
    const newState = {
      meal: {
        ...oldState.meal,
        foods: [
          ...oldState.meal.foods.slice(0, mealItemIndex),
          {
            ...oldState.meal.foods[mealItemIndex],
            weight: weight
          },
          ...oldState.meal.foods.slice(mealItemIndex + 1)
        ]
      }
    };

    return newState;
  });

  removeMealItem = mealItemIndex => this.setState(oldState => {
    const foods = [ ...oldState.meal.foods.slice(0, mealItemIndex), ...oldState.meal.foods.slice(mealItemIndex + 1) ];
    const newMeal = {
      ...oldState.meal,
      ... {
        foods,
      }
    };

    return {
      meal: newMeal
    };
  });

  addNewMealItem = () => this.setState(oldState => {
    const theSameFoodIndex = oldState.meal.foods.findIndex(meal => oldState.newMealItem.food._id === meal.food._id);
    const foods = theSameFoodIndex >= 0 
      ? [ ...oldState.meal.foods.slice(0, theSameFoodIndex),
          { ...oldState.meal.foods[theSameFoodIndex], weight: oldState.meal.foods[theSameFoodIndex].weight + oldState.newMealItem.weight },
          ...oldState.meal.foods.slice(theSameFoodIndex + 1) 
      ]
      : [ ...oldState.meal.foods, oldState.newMealItem ];
    const newMeal = {
      ...oldState.meal,
      ... {
        foods,
      }
    };

    this.foodAutoComplete.refs.wrappedInstance.clear();

    return {
      meal: newMeal,
      newMealItem: emptyNewMealModel
    };
  });

  updateNewMealFood = (food) => this.setState(oldState => {
    const newMealItem = {
      ...oldState.newMealItem,
      food: food || emptyFoodModel
    };

    return {
      newMealItem,
    }
  });

  updateNewMealWeight = weight => this.setState(oldState => {
    const newMealItem = {
      ...oldState.newMealItem,
      weight,
    };

    return {
      newMealItem
    }
  });

  isSubmitButtonDisabled = () => {
    let isDisabled = !this.state.meal.foods.length;

    this.state.meal.foods.forEach(meal => isDisabled = !meal.food._id || !meal.weight);

    return isDisabled;
  };

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
        <ModalHeader toggle={this.props.toggle}>{`${this.props.meal ? 'Edit' : 'New'} meal`}</ModalHeader>

        <ModalBody>
          <div>
            <h5>Time:</h5>
            <span>now</span>
          </div>

          <div>
            <div>
              <h5>Food set</h5>
            </div>
            <div>
              <ListGroup>
                {
                  this.state.meal.foods.map((meal, mealIndex) => (
                    <ListGroupItem key={mealIndex}>
                      <MealInputField 
                        avatarUrl={meal.food.avatarUrl}
                        foodAutoCompleteConfig={{
                          onChange: food => this.updateMealItemFood(food, mealIndex),
                          selected: [ meal.food ]
                        }}
                        weightInputConfig={{
                          value: meal.weight,
                          onChange: event => this.updateMealItemWeight(parseFloat(event.target.value), mealIndex)
                        }}
                        buttonConfig={{
                          color: "danger",
                          children:  <FontAwesome name='close'/>,
                          onClick: () => this.removeMealItem(mealIndex)
                        }}
                      />
                    </ListGroupItem>
                  ))
                }
                <ListGroupItem>
                  <MealInputField 
                    avatarUrl={this.state.newMealItem.food.avatarUrl}
                    foodAutoCompleteConfig={{
                      onChange: this.updateNewMealFood,
                      ref: foodAutoComplete => this.foodAutoComplete = foodAutoComplete
                    }}
                    weightInputConfig={{
                      value: this.state.newMealItem.weight,
                      onChange: event => this.updateNewMealWeight(parseFloat(event.target.value))
                    }}
                    buttonConfig={{
                      color: "success",
                      children:  <FontAwesome name='plus'/>,
                      onClick: this.addNewMealItem,
                      disabled: !this.state.newMealItem.food._id || !this.state.newMealItem.weight
                    }}
                  />
                </ListGroupItem>
              </ListGroup>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button color="primary"
                  disabled={this.isSubmitButtonDisabled()}
                  onClick={() => this.props.onSubmit(this.state.meal)}>
            {this.props.meal ? 'Edit' : 'Add'}
          </Button>{' '}
          <Button color="secondary" 
                  onClick={this.props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default MealModal;