import React from 'react';

const Overview = ({ data }) => {
  console.log('data: ', data);
  const percentMale = ((data.male / data.total) * 100).toFixed(2);
  const percentFemale = ((data.female / data.total) * 100).toFixed(2);
  const avgAge = Math.floor(data.ageTotal / data.total);

  return (
    <div className="overview">
      <div className="group">
        <p className="stat">Total Users: {data.total}</p>
        <p className="stat">Male: {percentMale}%</p>
        <p className="stat">Female: {percentFemale}%</p>
      </div>
      <div className="group">
        <p className="stat">Average Age: {avgAge}</p>
        <p className="stat">Youngest: {data.youngest}</p>
        <p className="stat">Oldest: {data.oldest}</p>
      </div>
    </div>
  );
};

export default Overview;
