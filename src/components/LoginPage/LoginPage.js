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
import { gql, graphql } from 'react-apollo';

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
        localStorage.setItem('token', data.login.token);
        this.setState({ isLoading: false });
        this.props.history.push('/');
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

export default graphql(login)(LoginPage);
