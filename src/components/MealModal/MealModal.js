import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import './MealModal.css';
import MealInputField from '../MealInputField/MealInputField';
import MealPlan from '../MealPlan/MealPlan';

const emptyMealModel = {
  foods: [],
};

const emptyProductModel = {
  _id: null,
  name: '',
  avatarUrl: '',
};

const emptyNewMealModel = {
  product: emptyProductModel,
  weight: 100,
};

class MealModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    meal: PropTypes.object,
    mealPlan: PropTypes.object,
    className: PropTypes.string,
    toggle: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    meal: null,
    mealPlan: null,
    className: '',
  };

  state = {
    meal: emptyMealModel,
    newMealItem: emptyNewMealModel,
  }

  componentWillReceiveProps({ meal }) {
    // To update state when new props are received.
    this.setState({
      meal: meal || emptyMealModel,
      newMealItem: emptyNewMealModel,
    });
  }

  updateMealItemFood = (product, mealItemIndex) => this.setState(oldState => ({
    meal: {
      ...oldState.meal,
      foods: [
        ...oldState.meal.foods.slice(0, mealItemIndex),
        {
          ...oldState.meal.foods[mealItemIndex],
          product: product || emptyProductModel,
        },
        ...oldState.meal.foods.slice(mealItemIndex + 1),
      ],
    },
  }));

  updateMealItemWeight = (weight, mealItemIndex) => this.setState(oldState => ({
    meal: {
      ...oldState.meal,
      foods: [
        ...oldState.meal.foods.slice(0, mealItemIndex),
        {
          ...oldState.meal.foods[mealItemIndex],
          weight,
        },
        ...oldState.meal.foods.slice(mealItemIndex + 1),
      ],
    },
  }));

  removeMealItem = mealItemIndex => this.setState(oldState => ({
    meal: {
      ...oldState.meal,
      ...{
        foods: [...oldState.meal.foods.slice(0, mealItemIndex), ...oldState.meal.foods.slice(mealItemIndex + 1)],
      },
    },
  }));

  addNewMealItem = () => this.setState((oldState) => {
    this.foodAutoComplete.refs.wrappedInstance.clear();

    return {
      meal: {
        ...oldState.meal,
        ...{
          foods: [...oldState.meal.foods, oldState.newMealItem],
        },
      },
      newMealItem: emptyNewMealModel,
    };
  });

  updateNewMealFood = product => this.setState((oldState) => {
    const newMealItem = {
      ...oldState.newMealItem,
      product: product || emptyProductModel,
    };

    return { newMealItem };
  });

  updateNewMealWeight = weight => this.setState(oldState => ({
    newMealItem: {
      ...oldState.newMealItem,
      weight,
    },
  }));

  isSubmitButtonDisabled = () => {
    let isDisabled = !this.state.meal.foods.length;

    this.state.meal.foods.forEach((meal) => { isDisabled = !meal.product._id || !meal.weight; });

    return isDisabled;
  };

  excludeProductsDuplication = product =>
    !this.state.meal.foods.find(food => food.product._id === product._id);

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
        <ModalHeader toggle={this.props.toggle}>{`${this.props.meal ? 'Edit' : 'New'} meal`}</ModalHeader>

        <ModalBody>
          {
            this.props.mealPlan && (
              <div>
                <div>
                  <h5>Foods by your food plan</h5>
                </div>
                <div>
                  <MealPlan mealPlan={this.props.mealPlan} foods={this.state.meal.foods} />
                </div>
              </div>
            )
          }

          <div>
            <div>
              <h5>Food set</h5>
            </div>
            <div>
              <ListGroup>
                {
                  this.state.meal.foods.map((food, mealIndex) => (
                    <ListGroupItem key={food._id}>
                      <MealInputField
                        avatarUrl={food.product.avatarUrl}
                        foodAutoCompleteConfig={{
                          onChange: product => this.updateMealItemFood(product, mealIndex),
                          filterBy: this.excludeProductsDuplication,
                          selected: food.product,
                        }}
                        weightInputConfig={{
                          value: food.weight,
                          onChange: event => this.updateMealItemWeight(parseFloat(event.target.value), mealIndex),
                        }}
                        buttonConfig={{
                          color: 'danger',
                          children:  <FontAwesome name="close" />,
                          onClick: () => this.removeMealItem(mealIndex),
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
                      filterBy: this.excludeProductsDuplication,
                      ref: (foodAutoComplete) => { this.foodAutoComplete = foodAutoComplete; },
                    }}
                    weightInputConfig={{
                      value: this.state.newMealItem.weight,
                      onChange: event => this.updateNewMealWeight(parseFloat(event.target.value)),
                    }}
                    buttonConfig={{
                      color: 'success',
                      children: <FontAwesome name="plus" />,
                      onClick: this.addNewMealItem,
                      disabled: !this.state.newMealItem.product._id || !this.state.newMealItem.weight,
                    }}
                  />
                </ListGroupItem>
              </ListGroup>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            disabled={this.isSubmitButtonDisabled()}
            onClick={() => this.props.onSubmit(this.state.meal)}
          >
            {this.props.meal ? 'Edit' : 'Add'}
          </Button>{' '}
          <Button
            color="secondary"
            onClick={this.props.toggle}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default MealModal;
