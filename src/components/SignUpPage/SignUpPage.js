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

const PUPROSES = [
  {
    title: 'Increase muscle mass',
    value: 'INCREASE_MUSCLE_MASS',
  },
  {
    title: 'Increase muscle strength',
    value: 'INCREASE_MUSCLE_STRENGTH',
  },
  {
    title: 'Weight Loss',
    value: 'WEIGHT_LOSS',
  },
  {
    title: 'Creating a body relief',
    value: 'CREATING_A_BODY_RELIEF',
  },
  {
    title: 'Maintaining the form already achieved',
    value: 'MAINTAINING_THE_FORM_ALREADY_ACHIEVED',
  }
];

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
          gender: this.state.gender,
          height: this.state.height,
          weight: this.state.weight,
          purpose: this.state.purpose
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
          <FormGroup row>
            <Label xs="12" md="4">Email</Label>
            <Col xs="12" md="8">
              <Input
                type="email"
                name="email"
                placeholder="Email"
                required
                onChange={this.onChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label xs="12" md="4">Password</Label>
            <Col xs="12" md="8">
              <Input
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={this.onChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label xs="12" md="4">Confirm password</Label>
            <Col xs="12" md="8">
              <Input
                type="password"
                name="password2"
                placeholder="Confirm password"
                required
                onChange={this.onChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label xs="12" md="4">Name</Label>
            <Col xs="12" md="8">
              <Input
                type="text"
                name="name"
                placeholder="Name"
                onChange={this.onChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label xs="12" md="4">Surname</Label>
            <Col xs="12" md="8">
              <Input
                type="text"
                name="surname"
                placeholder="Surname"
                onChange={this.onChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label xs="12" md="4">Age</Label>
            <Col xs="12" md="8">
              <Input
                type="number"
                name="age"
                placeholder="Age"
                required
                onChange={this.onChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label xs="12" md="4">Gender</Label>
            <Col xs="12" md="8">
              <Input
                type="select"
                name="gender"
                placeholder="Gender"
                required
                onChange={this.onChange}
              >
                <option>male</option>
                <option>female</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label xs="12" md="4">Height (cm)</Label>
            <Col xs="12" md="8">
              <Input
                type="number"
                name="height"
                placeholder="Height"
                required
                onChange={this.onChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label xs="12" md="4">Weight (kg)</Label>
            <Col xs="12" md="8">
              <Input
                type="number"
                name="weight"
                placeholder="Weight"
                required
                onChange={this.onChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label xs="12" md="4">Purpose</Label>
            <Col xs="12" md="8">
              <Input 
                type="select" 
                name="purpose" 
                placeholder="Purpose"
                required
                onChange={this.onChange}
              >
                {
                  PUPROSES.map((purpose, index) => <option value={purpose.value} key={index}>{purpose.title}</option>)
                }
              </Input>
            </Col>
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
