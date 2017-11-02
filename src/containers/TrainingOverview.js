import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

import TrainingOverview from '../components/TrainingOverview/TrainingOverview';

const trainingHistory = gql`
  query trainingHistory($id: ID!) {
    trainingHistoryItem(_id: $id) {
      _id,
      date,
      exerciseAproaches {
        _id,
        exercise {
          name,
          avatarUrl,
        },
        count
      }
    }
  }
`;

export default graphql(trainingHistory, {
  options: ({ match }) => ({
    variables: { id: match.params.id },
  }),
  props: ({ data: { trainingHistoryItem } }) => ({
    ...trainingHistoryItem
  }),
})(TrainingOverview);