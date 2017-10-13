import React from 'react';
import {
  Row,
  Col
} from 'reactstrap';

import './CharacteristicField.css';

export const CharacteristicField = (props) => 
  <Row {...props} className={`characteristic-field ${props.className}`}/>;

export const CharacteristicKey = (props) =>
  <Col xs="12" sm="6" md="4" lg="3" {...props} className={`characteristic-field__col ${props.className}`}/>

export const CharacteristicValue = (props) =>
  <Col xs="12" sm="6" md="8" lg="9" {...props} className={`characteristic-field__col ${props.className}`}/>