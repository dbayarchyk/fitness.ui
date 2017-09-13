import React from 'react';
import { Alert } from 'reactstrap';

import './NoTraining.css';

const NoTraining = () => (
  <div className="no-training">
    <Alert color="info" className="no-training__message">
      You have no training for today. Just relax!
    </Alert>
  </div>
);

export default NoTraining;