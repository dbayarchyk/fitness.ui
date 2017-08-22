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

const emptyProductModel = {
  _id: null,
  name: '',
  avatarUrl: ''
};

const emptyNewMealModel = {
  product: emptyProductModel,
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

  updateMealItemFood = (product, mealItemIndex) => this.setState(oldState => {
    const newState = {
      meal: {
        ...oldState.meal,
        foods: [
          ...oldState.meal.foods.slice(0, mealItemIndex),
          {
            ...oldState.meal.foods[mealItemIndex],
            product: product || emptyProductModel
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
    const theSameFoodIndex = oldState.meal.foods.findIndex(meal => oldState.newMealItem.product._id === meal.product._id);
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

  updateNewMealFood = (product) => this.setState(oldState => {
    const newMealItem = {
      ...oldState.newMealItem,
      product: product || emptyProductModel
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

    this.state.meal.foods.forEach(meal => isDisabled = !meal.product._id || !meal.weight);

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
                  this.state.meal.foods.map((food, mealIndex) => (
                    <ListGroupItem key={mealIndex}>
                      <MealInputField 
                        avatarUrl={food.product.avatarUrl}
                        foodAutoCompleteConfig={{
                          onChange: product => this.updateMealItemFood(product, mealIndex),
                          selected: [ food.product ]
                        }}
                        weightInputConfig={{
                          value: food.weight,
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
                    avatarUrl={this.state.newMealItem.product.avatarUrl}
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
                      disabled: !this.state.newMealItem.product._id || !this.state.newMealItem.weight
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