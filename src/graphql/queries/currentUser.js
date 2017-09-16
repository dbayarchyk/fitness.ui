import { gql } from 'react-apollo';

export const CURRENT_USER_QUERY = gql`
  query currentUser {
    currentUser {
      _id
    }
  }
`;