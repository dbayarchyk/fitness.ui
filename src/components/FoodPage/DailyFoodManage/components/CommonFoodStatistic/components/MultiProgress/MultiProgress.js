import React from 'react';
import PropTypes from 'prop-types';
import {
  Progress
} from 'reactstrap';

import './MultiProgress.css';

const getRelativeValue = (value, commonValue) =>
  Math.round(value * 100 / commonValue);

const MultiProgress = ({ value, commonValue, units }) => {
  value = Math.round(value);
  commonValue = Math.round(commonValue);

  const isFit = commonValue - value >= 0;
  const leftBarValue = getRelativeValue(value, isFit ? commonValue : (commonValue + value));
  const rightBarValue = Math.abs(100 - leftBarValue);

  return (
    <Progress multi>
      <Progress bar 
        color="success" 
        value={leftBarValue}
      >
        {isFit ? value : commonValue} {units}
      </Progress>

      <Progress bar 
        color={isFit ? 'gray' : 'danger'} 
        value={rightBarValue}
      >
        {Math.abs(commonValue - value)} {units}
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