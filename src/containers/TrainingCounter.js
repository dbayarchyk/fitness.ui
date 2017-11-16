import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../actions/training';
import Counter from '../components/Counter/Counter';

class TrainingCounter extends Component {
  static propTypes = {
    maxCount: PropTypes.number,
    finishApproach: PropTypes.func.isRequired,
    isPaused: PropTypes.bool,
    isStarted: PropTypes.bool,
  }

  static defaultProps = {
    maxCount: 0,
    isPaused: true,
    isStarted: false,
  }

  state = {
    count: 0,
  }

  componentWillReceiveProps(props) {
    if (props.isStarted && !props.isPaused) {
      this.startTimer();
    } else if (props.isPaused) {
      this.stopTimer();
    }

    if (!props.isStarted) {
      this.resetTimer();
    }
  }

  setCount = () => {
    if (this.state.count >= this.props.maxCount) {
      this.props.finishApproach();
      this.resetTimer();
    } else {
      this.setState(prevState => ({ count: prevState.count + 1 }));
    }
  }

  startTimer() {
    this.timer = setInterval(this.setCount, 1500);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  resetTimer() {
    this.setState({ count: 0 });
  }

  render() {
    return <Counter count={this.state.count} />;
  }
}

const mapStateToProps = state => ({
  isStarted: state.training.isApproachStarted,
  isPaused: state.training.isApproachStopped,
  maxCount: state.training.trainingData
            && state.training.trainingData.exerciseAproaches[state.training.currentExerciseApproachIndex]
            && state.training.trainingData.exerciseAproaches[state.training.currentExerciseApproachIndex].count,
});

const mapDispatchToProps = dispatch => ({
  finishApproach: () => dispatch(actions.finishApproach()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainingCounter);
