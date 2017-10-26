import './SignUpPage.css';

import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap';
import React from 'react';

import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner/Spinner';

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

const SignUpPage = ({ isLoading, onChange, onSubmit }) => (
  <div className="signup">
    <h3>Sign up</h3>
    <Form className="signup__form" onSubmit={onSubmit}>
      <FormGroup row>
        <Label xs="12" md="4">Email</Label>
        <Col xs="12" md="8">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
          >
            <option value="male">male</option>
            <option value="female">female</option>
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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

    <Spinner isLoading={isLoading} />
  </div>
);

export default SignUpPage;
