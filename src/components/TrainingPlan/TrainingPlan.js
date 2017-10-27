import React from 'react';
import PropTypes from 'prop-types';
import {
  CardBlock,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';

import './TrainingPlan.css';

import FCard from '../common/Card/Card';

const TrainingPlan = ({
  _id,
  name,
  avatarUrl,
  trainings,
  userTrainingPlanId,
  changeUserTrainingPlan,
}) => (
  <FCard
    header={{
      title: { children: name },
      rightButton: userTrainingPlanId === _id
        ? {
          onClick: () => changeUserTrainingPlan(null),
          children: <FontAwesome name="minus" />,
        }
        : {
          onClick: () => changeUserTrainingPlan(_id),
          children: <FontAwesome name="plus" />,
        },
    }}

    img={{ src: avatarUrl }}

    body={{
      children: (
        <CardBlock className="training-plan__trainings">
          <div className="training-plan__trainings__title">
            <h4>Exercises plan</h4>
          </div>

          <Row>
            {
              trainings.map(training => (
                <Col xs="12" sm="12" md="6" lg="4" key={training._id}>
                  <FCard
                    header={{
                      title: { children: moment(training.date).format('dddd') },
                    }}

                    body={{
                      children: (
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
                      ),
                    }}
                  />
                </Col>
              ))
            }
          </Row>
        </CardBlock>
      ),
    }}
  />
);

TrainingPlan.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string,
  avatarUrl: PropTypes.string,
  trainings: PropTypes.array,
  userTrainingPlanId: PropTypes.string,
  changeUserTrainingPlan: PropTypes.func.isRequired,
};

TrainingPlan.defaultProps = {
  name: 'Training Plan',
  avatarUrl: '',
  trainings: [],
  userTrainingPlanId: null,
};

export default TrainingPlan;
