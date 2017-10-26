import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { toastr } from 'react-redux-toastr';
import * as authActions from '../actions/auth';

import LoginPage from '../components/LoginPage/LoginPage';

const login = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;

class LoginPageContainer extends Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  state = {
    isLoading: false,
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  
  onSubmit = (e) => {
    e.preventDefault();

    this.setState({ isLoading: true });

    const { isLoading, ...payload } = this.state;

    this.props.mutate({ variables: payload })
      .then(({ data }) => {
        this.setState({ isLoading: false });
        toastr.success('Welcome to the application!');
        this.props.login(data.login.token);
        this.props.history.push('/app');
      })
      .catch(({ graphQLErrors }) => {
        this.setState({ isLoading: false });

        graphQLErrors.forEach(error => toastr.error(error.message));
      });
  }

  render() {
    return (
      <LoginPage
        isLoading={this.state.isLoading}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}

const LoginWithMutations = graphql(login)(LoginPageContainer);

const mapDispatchToProps = dispatch => ({
  login: token => dispatch(authActions.login(token)),
});

export default connect(null, mapDispatchToProps)(LoginWithMutations);
