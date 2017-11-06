import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';

import withLoading from '../utils/withLoading';
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
    trainingPlans: PropTypes.array,
    userTrainingPlanId: PropTypes.string,
    updateUser: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
  }

  static defaultProps = {
    trainingPlans: [],
    userTrainingPlanId: null,
  }

  changeUserTrainingPlan = trainingPlan => this.props.updateUser({
    variables: {
      id: this.props.userId,
      data: { trainingPlan },
    },
  })
    .then(() => this.props.refetch());

  render() {
    return (
      <TrainingPlans
        trainingPlans={this.props.trainingPlans}
        userTrainingPlanId={this.props.userTrainingPlanId}
        changeUserTrainingPlan={this.changeUserTrainingPlan}
      />
    );
  }
}

        /* userTrainingPlanId={this.props.user.trainingPlan && this.props.data.user.trainingPlan._id} */

const TrainingPlansWithData = graphql(trainingPlansAndUser, {
  options: ({ userId }) => ({
    variables: {
      userId,
    },
    fetchPolicy: 'network-only',
  }),
  props: ({ data: { loading, trainingPlans, user, refetch } }) => ({
    isLoading: loading,
    refetch,
    trainingPlans,
    userTrainingPlanId: user && user.trainingPlan && user.trainingPlan._id,
  }),
})(withLoading(TrainingPlansContainer));

const TrainingPlansWithDataAndMutation = graphql(updateUser, { name: 'updateUser' })(TrainingPlansWithData);

const mapStateToProps = state => ({
  userId: state.auth.currentUser._id,
});

export default connect(mapStateToProps)(TrainingPlansWithDataAndMutation);
