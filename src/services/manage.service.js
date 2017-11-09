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
      })
  }
};
