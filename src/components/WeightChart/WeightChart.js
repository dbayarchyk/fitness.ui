import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const XAxisTickFormatter = (input) => {
  const inputDate = new Date(input);
  let date = inputDate.getDate();
  let month = inputDate.getMonth() + 1;
  const year = inputDate.getFullYear();

  if (date < 10) {
    date = `0${date}`;
  }

  if (month < 10) {
    month = `0${month}`;
  }

  return `${date}.${month}.${year}`;
};

const YAxisTickFormatter = input => `${input} kg`;

const WeightChart = ({ data, height, width}) => (
  <ResponsiveContainer height={height} width={width}>
    <LineChart data={data}>
      <XAxis
        dataKey="date"
        tickFormatter={XAxisTickFormatter}
        padding={{ left: 10, right: 10 }}
      />
      <YAxis
        dataKey="weight"
        tickFormatter={YAxisTickFormatter}
        padding={{ bottom: 10, top: 10 }}
      />
      <CartesianGrid stroke="#f5f5f5" />
      <Line type="monotone" dataKey="weight" stroke="#42a5f5" />
    </LineChart>
  </ResponsiveContainer>
);

WeightChart.propTypes = {
  data: PropTypes.arrayOf({
    date: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
  }),
  height: PropTypes.number,
  width: PropTypes.string,
};

WeightChart.defaultProps = {
  data: [],
  height: 300,
  width: '100%',
};

export default WeightChart;
