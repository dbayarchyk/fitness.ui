import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';

import TrainingPlans from '../components/TrainingPlans/TrainingPlans';

const trainingPlansAndUser = gql`
  query trainingPlansAndUser($userId: ID!){
    trainingPlans(query: { isPrivate: false }) {
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

class TrainingPlansContainer extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,

    data: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
  }

  changeUserTrainingPlan = trainingPlan => this.props.updateUser({
    variables: {
      id: this.props.userId,
      data: { trainingPlan },
    },
  })
    .then(() => this.props.data.refetch());

  render() {
    if (this.props.data.loading) {
      return null;
    }

    return (
      <TrainingPlans
        isLoading={this.props.data.loading}
        trainingPlans={this.props.data.trainingPlans}
        userTrainingPlanId={this.props.data.user.trainingPlan && this.props.data.user.trainingPlan._id}
        changeUserTrainingPlan={this.changeUserTrainingPlan}
      />
    );
  }
}

const TrainingPlansWithData = graphql(trainingPlansAndUser, {
  options: ({ userId }) => ({
    variables: {
      userId,
    },
    fetchPolicy: 'network-only',
  }),
})(TrainingPlansContainer);

const TrainingPlansWithDataAndMutation = graphql(updateUser, { name: 'updateUser' })(TrainingPlansWithData);

const mapStateToProps = state => ({
  userId: state.auth.currentUser._id,
});

export default connect(mapStateToProps)(TrainingPlansWithDataAndMutation);
