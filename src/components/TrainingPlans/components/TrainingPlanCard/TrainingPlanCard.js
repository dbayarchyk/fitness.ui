import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import FCard from '../../../common/Card/Card';
import { 
  CharacteristicField,
  CharacteristicKey,
  CharacteristicValue
} from '../../../common/CharacteristicField/CharacteristicField';

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
        <CharacteristicField>
          <CharacteristicKey xs="8" sm="6" md="12" lg="8">Complexity</CharacteristicKey>
          <CharacteristicValue xs="4" sm="6" md="12" lg="4">{trainingPlan.complexity}</CharacteristicValue>
        </CharacteristicField>,
        <CharacteristicField>
          <CharacteristicKey xs="8" sm="6" md="12" lg="8">Number of trainings per week</CharacteristicKey>
          <CharacteristicValue xs="4" sm="6" md="12" lg="4">{trainingPlan.trainings.length}</CharacteristicValue>
        </CharacteristicField>
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