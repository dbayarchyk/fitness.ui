import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';

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
    data: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
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
      return <Spinner isLoading={this.props.data.loading} />;
    }

    const { trainingPlan, user } = this.props.data;
    const userTrainingPlan = user.trainingPlan;

    return (
      <TrainingPlan
        {...trainingPlan}
        userTrainingPlanId={userTrainingPlan ? userTrainingPlan._id : null}
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
})(TrainingPlanContainer);

const TrainingPlanWithDataAndMutation = graphql(updateUser, { name: 'updateUser' })(TrainingPlanWithData);

const mapStateToProps = state => ({
  userId: state.auth.currentUser._id,
});

export default connect(mapStateToProps)(TrainingPlanWithDataAndMutation);
