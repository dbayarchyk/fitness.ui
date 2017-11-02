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
import moment from 'moment';

const XAxisTickFormatter = (input) => moment(input).format('DD.MM.YYYY')

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
