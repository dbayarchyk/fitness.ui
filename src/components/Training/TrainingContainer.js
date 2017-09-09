import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql, withApollo } from 'react-apollo';

import Spinner from '../common/Spinner/Spinner';
import Training from './components/Training/Training';
import * as actions from '../../actions/training';

const userTrainingPlan = gql`
  query userTrainingPlan($userId: ID!) {
    user(_id: $userId) {
      trainingPlan {
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
      }
    }
  }
`;

class TrainingContainer extends Component {
  state = {
    isLoading: false
  }

  componentWillMount() {
    this.getUserCurrentTraining();
  }

  getUserCurrentTraining() {
    this.setState({ isLoading: true });
    
    this.props.client.query({
      query: userTrainingPlan, 
      variables: { userId: this.props.userId }
    })
      .then(({ data, loading }) => {
        this.props.setTrainingData(data.user.trainingPlan.trainings[0]);
        this.setState({ isLoading: loading });
      });
  }

  render() {
    if (this.state.isLoading) {
      return <Spinner isLoading={this.state.isLoading}/>
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
        finishApproach={this.props.finishApproach}
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
  currentExerciseApproachIndex: state.training.currentExerciseApproachIndex
});

const mapDispatchToProps = dispatch => ({
  setTrainingData: trainingData => dispatch(actions.setTrainingData(trainingData)),
  startApproach: () => dispatch(actions.startApproach()),
  stopApproach: () => dispatch(actions.stopApproach()),
  finishApproach: () => dispatch(actions.finishApproach()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withApollo(TrainingContainer));

