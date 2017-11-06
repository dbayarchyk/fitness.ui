import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import Spinner from '../common/Spinner/Spinner';
import TrainingPlanCard from '../TrainingPlanCard/TrainingPlanCard';

const TrainingPlans = ({
  trainingPlans,
  userTrainingPlanId,
  changeUserTrainingPlan,
}) => (
  <div>
    <Row>
      {
        trainingPlans.map(trainingPlan => (
          <Col xs="12" sm="12" md="3" lg="4" key={trainingPlan._id}>
            <TrainingPlanCard
              trainingPlan={trainingPlan}
              headerRightButton={
                userTrainingPlanId === trainingPlan._id
                  ? {
                    onClick: () => changeUserTrainingPlan(null),
                    children: <FontAwesome name="minus" />,
                  }
                  : {
                    onClick: () => changeUserTrainingPlan(trainingPlan._id),
                    children: <FontAwesome name="plus" />,
                  }
              }
            />
          </Col>
        ))
      }
    </Row>
  </div>
);

TrainingPlans.propTypes = {
  trainingPlans: PropTypes.array,
  userTrainingPlanId: PropTypes.string,
  changeUserTrainingPlan: PropTypes.func.isRequired,
};

TrainingPlans.defaultProps = {
  userTrainingPlanId: null,
  trainingPlans: [],
};

export default TrainingPlans;
