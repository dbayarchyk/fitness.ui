import React from 'react';
import PropTypes from 'prop-types';
import {
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

import './ExerciseApproachList.css';

const ExerciseApproachList = ({ exerciseAproaches, maxVisisbleCount }) => (
  <ListGroup className="exercise-aproache-list">
    {
      exerciseAproaches.map(exerciseAproache => (
        <ListGroupItem key={exerciseAproache._id} className="exercise-aproache-list__item">
          <div className="exercise-aproache-list__item__exercise-avatar-container">
            <img
              src={exerciseAproache.exercise.avatarUrl}
              className="exercise-aproache-list__item__exercise-avatar"
              alt="Exercise avatar"
            />
          </div>

          <div className="exercise-aproache-list__item__exercise-name">
            {exerciseAproache.exercise.name}
          </div>

          <div className="exercise-aproache-list__info">
            <div className="exercise-aproache-list__info__count">
              {exerciseAproache.count}
            </div>

            <div className="exercise-aproache-list__info__weight">
              {exerciseAproache.weight}
            </div>
          </div>
        </ListGroupItem>
      ))
    }
  </ListGroup>
);

ExerciseApproachList.propTypes = {
  exerciseAproaches: PropTypes.arrayOf({
    _id: PropTypes.string.isRequired,
    exercise: PropTypes.shape({
      avatarUrl: PropTypes.string,
      name: PropTypes.string,
    }),
    count: PropTypes.number,
    weight: PropTypes.number,
  }),
  maxVisisbleCount: PropTypes.number,
};

ExerciseApproachList.defaultProps = {
  exerciseAproaches: [],
  maxVisisbleCount: null,
};

export default ExerciseApproachList;
