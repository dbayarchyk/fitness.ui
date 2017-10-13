import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { gql, graphql, compose } from 'react-apollo';
import {
  Row,
  Button,
  Col,
  CardBlock,
  Badge
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { toastr } from 'react-redux-toastr';

import { 
  CharacteristicField,
  CharacteristicKey,
  CharacteristicValue
} from '../../common/CharacteristicField/CharacteristicField';
import Spinner from '../../common/Spinner/Spinner';
import EditableField from '../../common/EditableField/EditableField';
import FCard from '../../common/Card/Card';
import './AccountTab.css';

import getAccountData from './constants/accountData';

const getUserData = gql`
  query user($id: ID!) {
    user(_id: $id) {
      email,
      name,
      surname,
      age,
      weight,
      height,
      purpose,
      trainingPlan {
        _id,
        name,
        avatarUrl,
        trainings {
          _id
        }
      },
      foodPlan {
        _id,
        name,
        avatarUrl,
        calorificValue,
        nutrients {
          proteins,
          carbohydrates,
          fats
        }
      }
    }
  }
`;

const updateUser = gql`
  mutation updateUser($id: ID!, $data: UserInput!) {
    updateUser(_id: $id, data: $data) {
      email,
      name,
      surname,
      age,
      weight,
      height,
      purpose
    }
  }
`;

const generateUserTrainingPlan = gql`
  mutation generateUserTrainingPlan($userId: ID!) {
    generateUserTrainingPlan(userId: $userId) {
      _id
    }
  }  
`;

class AccountTab extends Component {
  onFieldChange = field => {
    this.props.updateUser({
      variables: {
        id: this.props.userID,
        data: { [field.name]: field.value }
      }
    })
      .then(() => this.props.data.refetch())
  }

  generateUserTrainingPlan = () => {
    this.props.generateUserTrainingPlan({
      variables: { userId: this.props.userID}
    })
      .then(() => {
        toastr.success('Your training plan has been generated!');

        this.props.data.refetch();
      })
  }

  render() {
    if (this.props.data.loading) {
      return <Spinner isLoading={this.props.data.loading}/>
    } else return (
      <div className="account">
        <Row>
          <Col>
            <FCard 
              header={{ title: { children: 'Your personal data'} }}

              body={{
                children: getAccountData(this.props.data.user, this.onFieldChange).map((item, index) => (
                  <CharacteristicField key={index}>
                    <CharacteristicKey>{item.key}</CharacteristicKey>
                    <CharacteristicValue><EditableField {...item.editableField}/></CharacteristicValue>
                  </CharacteristicField>
                ))
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col xs="12" sm="12" md="6" className="no-float">
            <FCard
              header={{
                title: {
                  children: this.props.data.user.foodPlan 
                    ? <Link to={`/app/food/food-plan/${this.props.data.user.foodPlan._id}`}>{this.props.data.user.foodPlan.name}</Link>
                    : 'You have not food plan'
                },
                rightButton: this.props.data.user.foodPlan && {
                  children: <FontAwesome name="minus"/>,
                  onClick: () => this.onFieldChange({ name: 'foodPlan', value: null })
                }
              }}

              img={this.props.data.user.foodPlan && {
                src: this.props.data.user.foodPlan.avatarUrl
              }}

              body={{
                children: this.props.data.user.foodPlan
                  ? <CardBlock className="food-plan__card__daily-nutrition-rate">
                      <Badge color="success" pill className="food-plan__card__daily-nutrition-rate__pill">
                        Calorific Value: {this.props.data.user.foodPlan.calorificValue}kcal
                      </Badge>
                      <Badge color="info" pill className="food-plan__card__daily-nutrition-rate__pill">
                        Proteins: {this.props.data.user.foodPlan.nutrients.proteins}g
                      </Badge>
                      <Badge color="info" pill className="food-plan__card__daily-nutrition-rate__pill">
                        Carbohydrates: {this.props.data.user.foodPlan.nutrients.carbohydrates}g
                      </Badge>
                      <Badge color="info" pill className="food-plan__card__daily-nutrition-rate__pill">
                        Fats: {this.props.data.user.foodPlan.nutrients.fats}g
                      </Badge>
                  </CardBlock>
                  : <CardBlock>Please select default food plan</CardBlock>
              }}

              footer={{
                children: [
                  <Link to={`/app/food/food-plans`}>
                    <Button block>Select food plan</Button>
                  </Link>
                ]
              }}
            />
          </Col>

          <Col xs="12" sm="12" md="6" className="no-float">
            <FCard
              header={{
                title: {
                  children: this.props.data.user.trainingPlan 
                    ? <Link to={`/app/training-plan/${this.props.data.user.trainingPlan._id}`}>{this.props.data.user.trainingPlan.name}</Link>
                    : 'You have not training plan'
                },
                rightButton: this.props.data.user.trainingPlan && {
                  children: <FontAwesome name="minus"/>,
                  onClick: () => this.onFieldChange({ name: 'trainingPlan', value: null })
                }
              }}

              img={this.props.data.user.trainingPlan && {
                src: this.props.data.user.trainingPlan.avatarUrl
              }}

              body={{
                children: this.props.data.user.trainingPlan
                  ? <CardBlock>
                      Training cout per week is <Badge color="info">{this.props.data.user.trainingPlan.trainings.length}</Badge>
                    </CardBlock>
                  : <CardBlock>Please select default training plan or generate your own</CardBlock>
              }}

              footer={{
                className: "training-plan__footer",
                children: [
                  <Link to={`/app/training-plans`}>
                    <Button className="training-plan__action">Select training plan</Button>
                  </Link>,
                  <Button className="training-plan__action" color="success" onClick={this.generateUserTrainingPlan}>
                    Generate training plan
                  </Button>
                ]
              }}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

const AccountTabWithData = graphql(getUserData, {
  options: ({ userID }) => ({
    variables: {
      id: userID
    }
  })
})(AccountTab);

const AccountTabWithDataAndMutations = compose(
  graphql(updateUser, { name: 'updateUser' }),
  graphql(generateUserTrainingPlan, { name: 'generateUserTrainingPlan' }),
)(AccountTabWithData);

const mapStateToProps = state => ({
  userID: state.auth.currentUser._id
});

export default connect(mapStateToProps)(AccountTabWithDataAndMutations);
