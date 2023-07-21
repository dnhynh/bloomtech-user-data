import React, { useState } from 'react';
import { AreaChart, BarChart } from 'recharts';

/**
 * Gender Chart
 * @param {Object} data Processed User Data
 * @returns {JSX} Gender Chart Component
 */
const AgeChart = ({ data }) => {
  const [chartType, setChartType] = useState('area');

  return <div>{chartType === 'bar' ? <BarChart></BarChart> : <AreaChart></AreaChart>}</div>;
};

export default AgeChart;
