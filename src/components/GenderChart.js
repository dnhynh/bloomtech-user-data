import React from 'react';
import { Pie, PieChart, Cell, LabelList } from 'recharts';

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
      <PieChart className="gender-chart" width={600} height={600}>
        <Pie data={genderData} cx="50%" cy="50%" label>
          {genderData.map((entry, index) => (
            <>
              <Cell key={`cell-${index}`} fill={entry['color']} label={entry['name']} />
            </>
          ))}
          <LabelList dataKey={'label'} />
        </Pie>
      </PieChart>
    </div>
  );
};

export default GenderChart;
