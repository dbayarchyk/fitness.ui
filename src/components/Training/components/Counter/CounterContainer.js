import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../actions/training';
import Counter from './Counter';

class CounterContainer extends Component {
  state = {
    count: 0
  }

  setCount = () => {
    if (this.state.count >= this.props.maxCount) {
      this.props.finishApproach();
      this.resetTimer();
    } else {
      this.setState(prevState => ({ count: prevState.count + 1}));
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

  componentWillReceiveProps(props) {
    if (props.isStarted && !props.isPaused) {
      this.startTimer();
    } else if (props.isPaused){
      this.stopTimer();
    }

    if (!props.isStarted) {
      this.resetTimer();
    }
  }

  render() {
    return <Counter count={this.state.count}/>
  }
}

const mapStateToProps = state => ({
  isStarted: state.training.isApproachStarted,
  isPaused: state.training.isApproachStopped,
  maxCount: state.training.trainingData && 
    state.training.trainingData.exerciseAproaches[state.training.currentExerciseApproachIndex].count
});

const mapDispatchToProps = dispatch => ({
  finishApproach: () => dispatch(actions.finishApproach())
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);

