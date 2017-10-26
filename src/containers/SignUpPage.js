import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import { toastr } from 'react-redux-toastr';

import SignUpPage from '../components/SignUpPage/SignUpPage';

const signup = gql`
  mutation addUser($data: UserInput!) {
    addUser(data: $data) {
      _id
    }
  }
`;

class SignUpPageContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    mutate: PropTypes.func.isRequired,
  }

  state = {
    isLoading: false,
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();

    this.setState({ isLoading: true });

    if (this.state.password !== this.state.password2) {
      toastr.error('Passwords don\'t match');
      return;
    }

    const { isLoading, password2, ...payload } = this.state;

    this.props.mutate({
      variables: {
        data: {
          ...payload,
          gender: this.state.gender || e.target.gender.value, // If user used default gender option.
          purpose: this.state.purpose || e.target.purpose.value, // If user used default purpose option.
        },
      },
    })
      .then(() => {
        this.isLoading = false;
        toastr.success('You signed up successfully!');

        this.props.history.push('/signin');

        this.setState({ isLoading: false });
      })
      .catch(({ graphQLErrors }) => {
        this.setState({ isLoading: false });

        graphQLErrors.forEach(error => toastr.error(error.message));
      });
  }

  render() {
    return (
      <SignUpPage
        isLoading={this.state.isLoading}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default graphql(signup)(SignUpPageContainer);
