import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gql, withApollo } from 'react-apollo';

import Spinner from '../components/common/Spinner/Spinner';
import Training from '../components/Training/Training';
import NoTraining from '../components/NoTraining/NoTraining';
import * as actions from '../actions/training';

const userTrainingPlan = gql`
  query userDailyTraining($userId: ID!) {
    userDailyTraining(_id: $userId) {
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
  }
`;

const addUserTrainingHistoryItem = gql`
  mutation addUserTrainingHistoryItem($data: TrainingHistoryInput!){
    addUserTrainingHistoryItem(data: $data) {
      _id
    }
  }
`;

const normalizeMutationObject = ({ __typename, ...normalized = {} }) => normalized;

class TrainingContainer extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    client: PropTypes.object.isRequired,
    setTrainingData: PropTypes.func.isRequired,
    resetTraining: PropTypes.func.isRequired,
    trainingData: PropTypes.object.isRequired,

    currentExerciseApproach: PropTypes.object.isRequired,
    currentExerciseApproachIndex: PropTypes.number.isRequired,
    isApproachStarted: PropTypes.bool.isRequired,
    isApproachStopped: PropTypes.bool.isRequired,
    startApproach: PropTypes.func.isRequired,
    stopApproach: PropTypes.func.isRequired,
    isTrainingFinished: PropTypes.bool.isRequired,
    finishApproach: PropTypes.func.isRequired,
  }

  state = {
    isLoading: false,
  }

  componentWillMount() {
    this.getUserCurrentTraining();
  }

  getUserCurrentTraining() {
    this.setState({ isLoading: true });

    this.props.client.query({
      query: userTrainingPlan,
      variables: { userId: this.props.userId },
    })
      .then(({ data, loading }) => {
        this.props.setTrainingData(data.userDailyTraining);
        this.setState({ isLoading: loading });
      });
  }

  submitTraining = () => {
    this.setState({ isLoading: true });

    // Removing __typename field
    const normalizedExerciseAproaches = this.props.trainingData.exerciseAproaches.map(exerciseAproache => ({
      ...normalizeMutationObject(exerciseAproache),
      exercise: exerciseAproache.exercise._id,
    }));

    this.props.client.mutate({
      mutation: addUserTrainingHistoryItem,
      variables: {
        data: {
          userId: this.props.userId,
          exerciseAproaches: normalizedExerciseAproaches,
          trainingIdInPlan: this.props.trainingData._id,
        },
      },
    })
      .then(({ loading }) => {
        this.setState({ isLoading: loading });
        this.props.resetTraining();
      });
  }

  render() {
    if (this.state.isLoading) {
      return <Spinner isLoading={this.state.isLoading} />;
    }

    if (!this.props.trainingData) {
      return <NoTraining />;
    }

    return (
      <Training
        exerciseAproaches={this.props.trainingData.exerciseAproaches}
        currentExerciseApproach={this.props.currentExerciseApproach}
        currentExerciseApproachIndex={this.props.currentExerciseApproachIndex}
        isApproachStarted={this.props.isApproachStarted}
        isApproachStopped={this.props.isApproachStopped}
        startApproach={this.props.startApproach}
        stopApproach={this.props.stopApproach}
        isTrainingFinished={this.props.isTrainingFinished}
        finishApproach={this.props.finishApproach}
        submitTraining={this.submitTraining}
        refCounter={(counter) => { this.counter = counter; }}
      />
    )
  }
}

const mapStateToProps = state => ({
  userId: state.auth.currentUser._id,
  trainingData: state.training.trainingData,
  currentExerciseApproach: state.training.trainingData && state.training.trainingData.exerciseAproaches[state.training.currentExerciseApproachIndex],
  isApproachStarted: state.training.isApproachStarted,
  isApproachStopped: state.training.isApproachStopped,
  isTrainingFinished: state.training.isTrainingFinished,
  currentExerciseApproachIndex: state.training.currentExerciseApproachIndex,
});

const mapDispatchToProps = dispatch => ({
  setTrainingData: trainingData => dispatch(actions.setTrainingData(trainingData)),
  startApproach: () => dispatch(actions.startApproach()),
  stopApproach: () => dispatch(actions.stopApproach()),
  finishApproach: () => dispatch(actions.finishApproach()),
  resetTraining: () => dispatch(actions.resetTraining()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withApollo(TrainingContainer));

