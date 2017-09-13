import * as actions from '../actions/training.js';

const defaultState = {
  trainingData: null,
  currentExerciseApproach: null,
  completedExercses: [],
  isApproachStarted: false,
  isApproachStopped: false,
  isTrainingFinished: false
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
    case actions.FINISH_APPROACH: {
      let isTrainingFinished = state.currentExerciseApproachIndex === state.trainingData.exerciseAproaches.length - 1;

      return {
        ...state,
        isApproachStarted: false,
        isApproachStopped: true,
        currentExerciseApproach: isTrainingFinished ? state.currentExerciseApproachIndex + 1 : state.currentExerciseApproachIndex,
        isTrainingFinished: isTrainingFinished
      };
    }
    case actions.RESET_TRAINING: 
      return defaultState
    default:
      return state;
  }
};


export default training;
