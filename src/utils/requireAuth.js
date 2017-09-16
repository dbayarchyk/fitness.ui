import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import { CURRENT_USER_QUERY } from '../graphql/queries';

const requireAuth = (ComposedComponent) => {
  class Authenticate extends React.Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
    };

    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/signin');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  return graphql(CURRENT_USER_QUERY, {
    props: ({ data: { currentUser }}) => ({
      isAuthenticated: !!currentUser
    })
  })(Authenticate);
}

export default requireAuth;
