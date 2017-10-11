import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import {
  Card,
  CardBlock,
  CardTitle,
  Badge
} from 'reactstrap';

import './TrainingPlanCard.css';

const TrainingPlanCard = ({ trainingPlan, titleRightIcon, className }) => (
  <Card block className={`training-plan__card ${className}`}>
    <CardTitle className="training-plan__card__title">
      <div className="training-plan__card__title__header" title={trainingPlan.name}>
        <Link to={`/app/training-plan/${trainingPlan._id}`}>{trainingPlan.name}</Link>
      </div>
      <div>
        { titleRightIcon }
      </div>
    </CardTitle>

    <CardBlock className="training-plan__card__avatar-container">
      <img className="training-plan__card__avatar" src={trainingPlan.avatarUrl} />
    </CardBlock>

    <CardBlock>
      <p>
        Complexity: {trainingPlan.complexity}
      </p>
      <p>
        Number of trainings per week: {trainingPlan.trainings.length}
      </p>
    </CardBlock>
  </Card>
);

TrainingPlanCard.propTypes = {
  className: PropTypes.string,
  trainingPlan: PropTypes.object.isRequired,
  titleRightIcon: PropTypes.node
};

export default TrainingPlanCard;