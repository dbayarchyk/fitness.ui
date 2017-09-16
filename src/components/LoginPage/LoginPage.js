import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { gql, graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';

import { CURRENT_USER_QUERY } from '../../graphql/queries';

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
      },
    })
      .then(({ data: { login } }) => {
        localStorage.setItem('token', login.token);
        this.props.data.refetch()
          .then(() => this.props.history.push('/app'));
        this.setState({ isLoading: false });
      })
      .catch(({ graphQLErrors }) => {
        alert(graphQLErrors[0].message);

        this.setState({ isLoading: false });
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

export default compose(
  graphql(CURRENT_USER_QUERY),
  graphql(login)
)(LoginPage);
