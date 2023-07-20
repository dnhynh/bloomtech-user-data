import React, { useState, useEffect } from 'react';
import { Pie, PieChart, Cell } from 'recharts';

/**
 * Gender Chart
 * @param {Object} data Processed User Data
 * @returns {JSX} Gender Chart Component
 */
const GenderChart = ({ data }) => {
  const genderData = [
    { value: data['female'], name: 'Female', label: 'Female', color: '#f7cac9' },
    { value: data['male'], name: 'Male', label: 'Male', color: '#b3cee5' },
  ];
  return (
    <div>
      <h2>Gender Chart</h2>
      <PieChart className="gender-chart" width={400} height={400}>
        <Pie data={genderData} cx="50%" cy="50%" outerRadius={80} label>
          {genderData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry['color']} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default GenderChart;
