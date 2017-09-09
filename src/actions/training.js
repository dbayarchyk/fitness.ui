export const SET_TRAINING_DATA = "SET_TRAINING_DATA";
export const SET_CURRENT_EXERCISE_APPROACH_INDEX = "SET_CURRENT_EXERCISE_APPROACH_INDEX";
export const START_APPROACH = "START_APPROACH";
export const STOP_APPROACH = "STOP_APPROACH";
export const FINISH_APPROACH = "FINISH_APPROACH";

export const setTrainingData = trainingData => ({
  type: SET_TRAINING_DATA,  
  trainingData,
});

export const setCurrentExerciseApproachIndex = currentExerciseApproachIndex => ({
  type: SET_TRAINING_DATA,
  currentExerciseApproachIndex,
});

export const startApproach = () => ({
  type: START_APPROACH
});

export const stopApproach = () => ({
  type: STOP_APPROACH
});

export const finishApproach = () => ({
  type: FINISH_APPROACH
});