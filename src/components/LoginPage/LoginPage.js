import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';

import * as authActions from '../../actions/auth';
import Spinner from '../common/Spinner/Spinner';
import './LoginPage.css';

const login = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

class LoginPage extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
  };

  state = {
    isLoading: false
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    this.setState({ isLoading: true });

    this.props.mutate({
      variables: {
        email: this.state.email,
        password: this.state.password
      }
    })
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
      <div className="login">
        <h3>Sign in</h3>
        <Form className="login__form" onSubmit={this.onSubmit.bind(this)}>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup row>
            <Col>
              <Link to="/signup"><Button block color="secondary" type="button">Sign up</Button></Link>
            </Col>
            <Col>
              <Button block color="primary" type="submit">Sign in</Button>
            </Col>
          </FormGroup>
        </Form>

        <Spinner isLoading={this.state.isLoading} />
      </div>
    )
  }
}

const LoginWithMutations = graphql(login)(LoginPage);

const mapDispatchToProps = dispatch => ({
  login: token => dispatch(authActions.login(token)),
});

export default connect(null, mapDispatchToProps)(LoginWithMutations);
