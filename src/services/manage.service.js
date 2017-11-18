import * as TYPE from '../constants/manageTypes';
import { gql } from 'react-apollo';

const usersQuery = gql`
  query users {
    users {
      _id,
      email,
      purpose,
      name,
      surname,
      age,
    }
  }
`;

const foodPlansQuery = gql`
  query foodPlans {
    foodPlans {
      _id,
      name,
      calorificValue,
    },
  }
`;

const trainingPlansQuery = gql`
  query trainingPlans {
    trainingPlans(query: { isPrivate: false }) {
      _id,
      name,
      avatarUrl,
      complexity,
      trainings {
        _id
      },
    },
  }
`;

const musclesQuery = gql`
  query muscles {
    muscles {
      _id,
      name,
      group,
    },
  }
`;

const exercisesQuery = gql`
  query exercises {
    exercises {
      _id,
      name,
      muscules {
        name,
      },
    },
  }
`;

export const getItems = (query, type) => {
  switch(type) {
    case TYPE.USERS:
      return new Promise((resolve, reject) => {
        query({
          query: usersQuery,
        })
          .then(({ data }) => resolve({ data: data.users }))
          .catch(err => reject(err))
      });
    case TYPE.FOOD_PLANS:
      return new Promise((resolve, reject) => {
        query({
          query: foodPlansQuery,
        })
          .then(({ data }) => resolve({ data: data.foodPlans }))
          .catch(err => reject(err))
      });
    case TYPE.TRAINING_PLANS:
      return new Promise((resolve, reject) => {
        query({
          query: trainingPlansQuery,
        })
          .then(({ data }) => resolve({ data: data.trainingPlans }))
          .catch(err => reject(err))
      });
    case TYPE.MUSCLES:
      return new Promise((resolve, reject) => {
        query({
          query: musclesQuery,
        })
          .then(({ data }) => resolve({ data: data.muscles }))
          .catch(err => reject(err))
      });
    case TYPE.EXERCISES:
      return new Promise((resolve, reject) => {
        query({
          query: exercisesQuery,
        })
          .then(({ data }) => resolve({ data: data.exercises }))
          .catch(err => reject(err))
      });
  }
};

const removeUserMutation = gql`
  mutation removeUser($id: ID!) {
    removeUser(_id: $id) {
      _id,
    }
  }
`;

const removeFoodPlanMutation = gql`
  mutation removeFoodPlan($id: ID!) {
    removeFoodPlan(_id: $id) {
      _id,
    }
  }
`;

const removeTrainingPlanMutation = gql`
  mutation removeTrainingPlan($id: ID!) {
    removeTrainingPlan(_id: $id) {
      _id,
    }
  }
`;

const removeMuscleMutation = gql`
  mutation removeMuscle($id: ID!) {
    removeMuscle(_id: $id) {
      _id,
    }
  }
`;

const removeExerciseMutation = gql`
  mutation removeExercise($id: ID!) {
    removeExercise(_id: $id) {
      _id,
    }
  }
`;

export const removeItem = (mutate, type, id) => {
  switch(type) {
    case TYPE.USERS:
      return new Promise((resolve, reject) => {
        mutate({
          mutation: removeUserMutation,
          variables: { id },
        })
          .then(({ data }) => resolve({ data: data.removeUser }))
          .catch(err => reject(err))
      });
    case TYPE.FOOD_PLANS:
      return new Promise((resolve, reject) => {
        mutate({
          mutation: removeFoodPlanMutation,
          variables: { id },
        })
          .then(({ data }) => resolve({ data: data.removeFoodPlan }))
          .catch(err => reject(err))
      });
    case TYPE.TRAINING_PLANS:
      return new Promise((resolve, reject) => {
        mutate({
          mutation: removeTrainingPlanMutation,
          variables: { id },
        })
          .then(({ data }) => resolve({ data: data.removeTraining }))
          .catch(err => reject(err))
      });
    case TYPE.MUSCLES:
      return new Promise((resolve, reject) => {
        mutate({
          mutation: removeMuscleMutation,
          variables: { id },
        })
          .then(({ data }) => resolve({ data: data.removeMuscle }))
          .catch(err => reject(err))
      });
    case TYPE.EXERCISES:
      return new Promise((resolve, reject) => {
        mutate({
          mutation: removeExerciseMutation,
          variables: { id },
        })
          .then(({ data }) => resolve({ data: data.removeExercise }))
          .catch(err => reject(err))
      });
  }
};
