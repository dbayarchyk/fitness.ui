import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import {
  Card,
  Row,
  Col,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import './TrainingPlan.css';
import Spinner from '../common/Spinner/Spinner';

const trainingPlanAndUser = gql`
  query getData($userId: ID!, $trainingPlanId: ID!) {
    trainingPlan(_id: $trainingPlanId) {
      _id,
      name,
      avatarUrl,
      trainings {
        _id,
        date,
        exerciseAproaches {
          exercise {
            _id,
            name,
            avatarUrl
          },
          count
        }
      }
    },
    user(_id: $userId) {
      trainingPlan {
        _id
      }
    }
  }
`;

const updateUser = gql`
  mutation updateUser($id: ID!, $data: UserInput!) {
    updateUser(_id: $id, data: $data) {
      _id
    }
  }
`;

class TrainingPlan extends Component {
  changeUserTrainingPlan = trainingPlan => this.props.updateUser({
    variables: {
      id: this.props.userId,
      data: { trainingPlan, }
    }
  })
    .then(data => this.props.data.refetch());

  render() {
    if (this.props.data.loading) {
      return <Spinner isLoading={this.props.data.loading} />
    }

    const { trainingPlan } = this.props.data;
    
    return (
      <div className="training-plan">

        <div className="training-plan__title">
          <div className="training-plan__title__name-container">
            <h1 className="training-plan__title__name">{trainingPlan.name}</h1>
          </div>
          
          <div className="training-plan__title__icon-container">
            {
              !!this.props.data.user.trainingPlan && this.props.data.user.trainingPlan._id === trainingPlan._id 
                ? <FontAwesome name="minus-square" onClick={() => this.changeUserTrainingPlan(null)}/> 
                : <FontAwesome name="plus-square" onClick={() => this.changeUserTrainingPlan(trainingPlan._id)}/>
            }
          </div>
        </div>

        <div className="training-plan__avatar-container">
          <img src={trainingPlan.avatarUrl} className="training-plan__avatar" alt="Training plan avatar"/>
        </div>

        <div className="training-plan__trainings">
          <div className="training-plan__trainings__title">
            <h4>Exercises plan</h4>
          </div>

          <Row>
            {
              trainingPlan.trainings.map(training => (
                <Col xs="12" sm="12" md="6" lg="4" key={training._id}>
                  <Card block className="training">
                    <div className="training__date">
                      Date: {training.date}
                    </div>

                    <div className="training__exercise-aproaches">
                      <ListGroup className="training__exercise-aproaches__list">
                        {
                          training.exerciseAproaches.map(exerciseAproache => (
                            <ListGroupItem key={exerciseAproache._id} className="training__exercise-aproaches__item">
                              <div className="training__exercise-aproaches__item__exercise-avatar-container">
                                <img 
                                  src={exerciseAproache.exercise.avatarUrl} 
                                  className="training__exercise-aproaches__item__exercise-avatar"
                                  alt="Exercise avatar"
                                />
                              </div>

                              <div className="training__exercise-aproaches__item__exercise-name">
                                {exerciseAproache.exercise.name}
                              </div>

                              <div className="training__exercise-aproaches__info">
                                <div className="training__exercise-aproaches__info__count">
                                  {exerciseAproache.count}
                                </div>

                                <div className="training__exercise-aproaches__info__weight">
                                  {exerciseAproache.weight}
                                </div>
                              </div>
                            </ListGroupItem>
                          ))
                        }
                      </ListGroup>
                    </div>
                  </Card>
                </Col>
              ))
            }
          </Row>
        </div>

      </div>
    )
  }
}

const TrainingPlanWithData = graphql(trainingPlanAndUser, {
  options: ({ userId, match }) => ({
    variables: {
      userId,
      trainingPlanId: match.params.id
    },
    fetchPolicy: 'network-only'
  })
})(TrainingPlan);

const TrainingPlanWithDataAndMutation = graphql(updateUser, { name: 'updateUser' })(TrainingPlanWithData);

const mapStateToProps = state => ({
  userId: state.auth.currentUser._id
});

export default connect(mapStateToProps)(TrainingPlanWithDataAndMutation);