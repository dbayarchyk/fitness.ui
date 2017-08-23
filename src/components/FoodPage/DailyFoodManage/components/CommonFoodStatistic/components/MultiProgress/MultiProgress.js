import React from 'react';
import PropTypes from 'prop-types';
import {
  Progress
} from 'reactstrap';

import './MultiProgress.css';

const getRelativeValue = (value, commonValue) =>
  Math.round(value * 100 / commonValue);

const MultiProgress = ({ value, commonValue, units }) => {
  const isFit = commonValue - value > 0;

  return (
    <Progress multi>
      <Progress bar color="success" 
                value={getRelativeValue(value, isFit ? commonValue : (commonValue + value))}
      >
        {Math.round(isFit ? value : commonValue)} {units}
      </Progress>
      <Progress bar color={isFit ? 'gray' : 'danger'} 
                value={getRelativeValue(Math.round(Math.abs(commonValue - value)), isFit ? commonValue : (commonValue + value))}
      >
        {Math.round(Math.abs(commonValue - value))} {units}
      </Progress>
    </Progress>
  );
};

MultiProgress.propTypes = {
  value: PropTypes.number.isRequired,
  commonValue: PropTypes.number.isRequired,
  units: PropTypes.string.isRequired
};

export default MultiProgress;