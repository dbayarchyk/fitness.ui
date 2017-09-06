import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import {
  Col,
  Row
} from 'reactstrap';

import Spinner from '../common/Spinner/Spinner';
import TrainingPlanCard from './components/TrainingPlanCard/TrainingPlanCard';

const trainingPlans = gql`
  query {
    trainingPlans {
      _id,
      name,
      avatarUrl,
      trainings {
        _id,
        date
      }
    }
  }
`;

class TrainingPlans extends Component {
  render() {
    if (this.props.data.loading) {
      return <Spinner isLoading={this.props.data.loading} />
    }

    return (
      <div>
        <div>
          <Row>
            {
              this.props.data.trainingPlans.map(trainingPlan => (
                <Col xs="12" sm="12" md="3" lg="4" key={trainingPlan._id}>
                  <TrainingPlanCard 
                    trainingPlan={trainingPlan}
                  />
                </Col>
              ))
            }
          </Row>
        </div>
      </div>
    )
  }
}

const TrainingPlansWithData = graphql(trainingPlans)(TrainingPlans);

export default TrainingPlansWithData;