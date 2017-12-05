import React from 'react';
import PropTypes from 'prop-types';
import {
  CardBlock,
  Row,
  Col,
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';

import './TrainingPlan.css';

import FCard from '../common/Card/Card';
import ExerciseApproachList from '../ExerciseApproachList/ExerciseApproachList';

const TrainingPlan = ({
  _id,
  name,
  avatarUrl,
  trainings,
  userTrainingPlanId,
  changeUserTrainingPlan,
}) => (
  <div>
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
                        children: <ExerciseApproachList exerciseAproaches={training.exerciseAproaches} />,
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
  </div>
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
