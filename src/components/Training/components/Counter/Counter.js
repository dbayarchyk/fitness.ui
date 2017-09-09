import React from 'react';

import './Counter.css';

const Counter = ({ count }) => (
  <div className="counter">
    {count}
  </div>
);

export default Counter;