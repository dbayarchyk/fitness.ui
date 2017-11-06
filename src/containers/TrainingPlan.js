import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';

import withLoading from '../utils/withLoading';
import Spinner from '../components/common/Spinner/Spinner';
import TrainingPlan from '../components/TrainingPlan/TrainingPlan';

const trainingPlanAndUser = gql`
  query getData($userId: ID!, $trainingPlanId: ID!) {
    trainingPlan(_id: $trainingPlanId) {
      _id,
      name,
      avatarUrl,
      trainings {
        _id,
        date,
        exerciseAproaches {
          exercise {
            _id,
            name,
            avatarUrl
          },
          count
        }
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

class TrainingPlanContainer extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    updateUser: PropTypes.func.isRequired,
    trainingPlan: PropTypes.object,
    userTrainingPlanId: PropTypes.string,
    refetch: PropTypes.func.isRequired,
  }

  static defaultProps = {
    trainingPlan: {},
    userTrainingPlanId: null,
  }

  changeUserTrainingPlan = trainingPlan => this.props.updateUser({
    variables: {
      id: this.props.userId,
      data: { trainingPlan },
    },
  })
    .then(() => this.props.data.refetch());

  render() {
    return (
      <TrainingPlan
        {...this.props.trainingPlan}
        userTrainingPlanId={this.props.userTrainingPlan}
        changeUserTrainingPlan={this.changeUserTrainingPlan}
      />
    );
  }
}

const TrainingPlanWithData = graphql(trainingPlanAndUser, {
  options: ({ userId, match }) => ({
    variables: {
      userId,
      trainingPlanId: match.params.id,
    },
    fetchPolicy: 'network-only',
  }),
  props: ({ data: { loading, refetch, trainingPlan, user } }) => ({
    isLoading: loading,
    refetch,
    trainingPlan,
    userTrainingPlanId: user && user.trainingPlan && user.trainingPlan._id,
  }),
})(withLoading(TrainingPlanContainer));

const TrainingPlanWithDataAndMutation = graphql(updateUser, { name: 'updateUser' })(TrainingPlanWithData);

const mapStateToProps = state => ({
  userId: state.auth.currentUser._id,
});

export default connect(mapStateToProps)(TrainingPlanWithDataAndMutation);
