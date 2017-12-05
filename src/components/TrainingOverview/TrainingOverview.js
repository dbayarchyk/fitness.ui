import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  CardBlock,
} from 'reactstrap';
import moment from 'moment';

import './TrainingOverview.css';

import FCard from '../common/Card/Card';
import ExerciseApproachList from '../ExerciseApproachList/ExerciseApproachList';

const TrainingOverview = ({ date, exerciseAproaches }) => (
  <div>
    <FCard
      header={{ 
        title: { children: moment(date).format('Do MMMM YYYY h:mm a') }
      }}

      body={{
        children: (
          <CardBlock className="training-overview">
            <Row>
              <Col xs="12" sm="12" md="12" lg="12" className="no-float">
                <ExerciseApproachList exerciseAproaches={exerciseAproaches} />
              </Col>
            </Row>
          </CardBlock>
        ),
      }}
    />
  </div>
);

ExerciseApproachList.propTypes = {
  _id: PropTypes.string.isRequired,
  date: PropTypes.string,
  exerciseAproaches: PropTypes.arrayOf({
    _id: PropTypes.string.isRequired,
    exercise: PropTypes.shape({
      avatarUrl: PropTypes.string,
      name: PropTypes.string,
    }),
    count: PropTypes.number,
    weight: PropTypes.number,
  }),
};

ExerciseApproachList.defaultProps = {
  date: null,
  exerciseAproaches: [],
};

export default TrainingOverview;
