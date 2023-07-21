import React from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';

/**
 * Gender Chart
 * @param {Object} data Processed User Data
 * @returns {JSX} Gender Chart Component
 */
const AgeChart = ({ data }) => {
  const { age } = data;
  const chartData = [];
  for (let value in age) {
    chartData.push({ age: value, count: age[value] });
  }

  return (
    <BarChart width={800} height={500} data={chartData}>
      {/* Needs Labels */}
      <XAxis dataKey="age" />
      <YAxis dataKey="count" />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
};

export default AgeChart;
