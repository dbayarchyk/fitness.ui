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

import './MealModal.css';

const emptyMealModel = {
  date: null,
  foods: []
}

const emptyNewMealModel = {
  food: {
    _id: null,
    name: '',
    avatarUrl: ''
  },
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
    const foods = [ ...oldState.meal.foods, oldState.newMealItem ];
    const newMeal = {
      ...oldState.meal,
      ... {
        foods,
      }
    };

    return {
      meal: newMeal,
      newMealItem: emptyNewMealModel
    };
  });

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
        <ModalHeader toggle={this.props.toggle}>{`${this.props.meal ? 'Edit' : 'New'} meal`}</ModalHeader>

        <ModalBody>
          <div>
            <h5>Time</h5>
          </div>

          <div>
            <div>
              <h5>Food set</h5>
            </div>
            <div>
              <ListGroup>
                {
                  this.state.meal.foods.map((meal, mealIndex) => (
                    <ListGroupItem key={meal.mealIndex}>
                      <InputGroup>
                        <InputGroupAddon>
                          <img src={meal.avatarUrl} className="meal__avatar"/>
                        </InputGroupAddon>
                        <Input placeholder="Food" type="text" value={meal.food.name}/>
                        <Input placeholder="Weight" type="number" value={meal.weight}/>
                        <InputGroupAddon>g</InputGroupAddon>
                        <InputGroupButton>
                          <Button color="danger" onClick={() => this.removeMealItem(mealIndex)}>
                            <FontAwesome name='close'/>
                          </Button>
                        </InputGroupButton>
                      </InputGroup>
                    </ListGroupItem>
                  ))
                }
                <ListGroupItem>
                  <InputGroup>
                    <InputGroupAddon>
                      <img src={this.state.newMealItem.food.avatarUrl} className="meal__avatar"/>
                    </InputGroupAddon>
                    <Input placeholder="Food" type="text" value={this.state.newMealItem.food.name}/>
                    <Input placeholder="Weight" type="number" value={this.state.newMealItem.weight}/>
                    <InputGroupAddon>g</InputGroupAddon>
                    <InputGroupButton>
                      <Button color="success" onClick={this.addNewMealItem}>
                        <FontAwesome name='plus'/>
                      </Button>
                    </InputGroupButton>
                  </InputGroup>
                </ListGroupItem>
              </ListGroup>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => this.props.onSubmit(this.state.meal)}>{this.props.meal ? 'Edit' : 'Add'}</Button>{' '}
          <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default MealModal;
