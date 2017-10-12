import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import FCard from '../../../common/Card/Card';

import './TrainingPlanCard.css';

const TrainingPlanCard = ({ trainingPlan, headerRightButton, className }) => (
  <FCard className={className}
    header={{
      title: { children: <Link to={`/app/training-plan/${trainingPlan._id}`}>{trainingPlan.name}</Link>},
      rightButton: headerRightButton
    }}

    img={{ src: trainingPlan.avatarUrl}}

    body={{
      children: [
        <div className="characteristics__field">
          <div className="characteristics__field__key">Complexity</div>
          <div className="characteristics__field__value">{trainingPlan.complexity}</div>
        </div>,
        <div className="characteristics__field">
          <div className="characteristics__field__key">Number of trainings per week</div>
          <div className="characteristics__field__value">{trainingPlan.trainings.length}</div>
        </div>
      ]
    }}
  />
);

TrainingPlanCard.propTypes = {
  className: PropTypes.string,
  trainingPlan: PropTypes.object.isRequired,
  headerRightButton: PropTypes.object
};

export default TrainingPlanCard;