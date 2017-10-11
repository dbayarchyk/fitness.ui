import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import {
  Col,
  Row
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import Spinner from '../common/Spinner/Spinner';
import TrainingPlanCard from './components/TrainingPlanCard/TrainingPlanCard';

const trainingPlansAndUser = gql`
  query trainingPlansAndUser($userId: ID!){
    trainingPlans {
      _id,
      name,
      avatarUrl,
      complexity,
      trainings {
        _id,
        date
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

class TrainingPlans extends Component {
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

    return (
      <div>
        <div>
          <Row>
            {
              this.props.data.trainingPlans.map(trainingPlan => (
                <Col xs="12" sm="12" md="3" lg="4" key={trainingPlan._id}>
                  <TrainingPlanCard
                    className="full-height"
                    trainingPlan={trainingPlan}
                    titleRightIcon={
                      !!this.props.data.user.trainingPlan && this.props.data.user.trainingPlan._id === trainingPlan._id 
                        ? <FontAwesome name="minus-square" onClick={() => this.changeUserTrainingPlan(null)}/> 
                        : <FontAwesome name="plus-square" onClick={() => this.changeUserTrainingPlan(trainingPlan._id)}/>
                    }
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

const TrainingPlansWithData = graphql(trainingPlansAndUser, {
  options: ({ userId }) => ({
    variables: {
      userId,
    },
    fetchPolicy: 'network-only'
  })
})(TrainingPlans);

const FoodPlansWithDataAndMutation = graphql(updateUser, { name: 'updateUser' })(TrainingPlansWithData);

const mapStateToProps = state => ({
  userId: state.auth.currentUser._id
});

export default connect(mapStateToProps)(FoodPlansWithDataAndMutation);