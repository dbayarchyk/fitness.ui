import './SignUpPage.css';

import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap';
import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner/Spinner';

const signup = gql`
  mutation addUser($data: UserInput!) {
    addUser(data: $data) {
      _id
    }
  }
`;

class SignUpPage extends Component {
  state = {
    isLoading: false
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    this.setState({ isLoading: true });

    if (this.state.password !== this.state.password2) {
      alert('Passwords don\'t match');
      return;
    }

    this.props.mutate({
      variables: {
        data: {
          email: this.state.email,
          password: this.state.password,
          name: this.state.name,
          surname: this.state.surname,
          age: this.state.age,
          sex: this.state.sex,
          height: this.state.height,
          weight: this.state.weight,
        }
      }
    })
      .then(({ data }) => {
        this.isLoading = false;

        this.props.history.push('/signin');

        this.setState({ isLoading: false });
      })
      .catch(({ graphQLErrors }) => {
        alert(graphQLErrors[0].message);

        this.setState({ isLoading: false });
      });
  }

  render() {
    return (
      <div className="signup">
        <h3>Sign up</h3>
        <Form className="signup__form" onSubmit={this.onSubmit.bind(this)}>
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
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Confirm password</Label>
            <Input
              type="password"
              name="password2"
              placeholder="Confirm password"
              required
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Surname</Label>
            <Input
              type="text"
              name="surname"
              placeholder="Surname"
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Age</Label>
            <Input
              type="number"
              name="age"
              placeholder="Age"
              required
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Sex</Label>
            <Input
              type="select"
              name="sex"
              placeholder="Sex"
              required
              onChange={this.onChange}
            >
              <option>male</option>
              <option>female</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Height (cm)</Label>
            <Input
              type="number"
              name="height"
              placeholder="Height"
              required
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Weight (kg)</Label>
            <Input
              type="number"
              name="weight"
              placeholder="Weight"
              required
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup row>
            <Col>
              <Link to="/signin"><Button block color="secondary" type="button">Sign in</Button></Link>
            </Col>
            <Col>
              <Button block color="primary" type="submit">Sign up</Button>
            </Col>
          </FormGroup>
        </Form>

        <Spinner isLoading={this.state.isLoading} />
      </div>
    )
  }
}

export default graphql(signup)(SignUpPage);
