import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Spinner from '../common/Spinner/Spinner';
import './LoginPage.css';

const LoginPage = ({ isLoading, onSubmit, onChange }) => (
  <div className="login">
    <h3>Sign in</h3>
    <Form className="login__form" onSubmit={onSubmit}>
      <FormGroup>
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={onChange}
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

    <Spinner isLoading={isLoading} />
  </div>
);

LoginPage.propTypes = {
  isLoading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

LoginPage.deafultProps = {
  isLoading: false
}

export default LoginPage;
