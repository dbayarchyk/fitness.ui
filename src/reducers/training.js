import * as actions from '../actions/training.js';

const defaultState = {
  trainingData: null,
  currentExerciseApproach: null,
  completedExercses: [],
  isApproachStarted: false,
  isApproachStopped: false
};

const training = (state = defaultState, action) => {
  switch (action.type) {
    case actions.SET_TRAINING_DATA:
      return {
        ...state,
        trainingData: action.trainingData,
        currentExerciseApproachIndex: 0
      };
    case actions.SET_CURRENT_EXERCISE_APPROACH_INDEX:
      return {
        ...state,
        currentExerciseApproachIndex: action.currentExerciseApproachIndex
      };
    case actions.START_APPROACH:
      return {
        ...state,
        isApproachStarted: true,
        isApproachStopped: false
      };
    case actions.STOP_APPROACH:
      return {
        ...state,
        isApproachStopped: true
      };
    case actions.FINISH_APPROACH:
      return {
        ...state,
        isApproachStarted: false,
        isApproachStopped: false,
        currentExerciseApproach: state.currentExerciseApproachIndex + 1
      };
    default:
      return state;
  }
};


export default training;
