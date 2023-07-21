import React from 'react';
import csvDownload from 'json-to-csv-export';
import { getCsvHeaders } from '../ProcessData';

const Controls = ({ refreshData, filters, setFilters, data, csvData }) => {
  const downloadData = (e) => {
    const dataType = e.target.getAttribute('dataType');
    const dataToConvert = {
      data: csvData,
      filename: 'bloomtech_user_data', // Can pass Filter values here for dynamic file name
      delimiter: ',',
      headers: getCsvHeaders(),
    };
    if (dataType === 'csv') {
      csvDownload(dataToConvert);
    } else {
      //TODO: Need to Implement API Layer for JSON download
    }
  };

  //These can be combined into one function but I want to go to sleep soon
  const toggleFemale = () => {
    setFilters({
      ...filters,
      female: !filters.female,
    });
  };

  const toggleMale = () => {
    setFilters({
      ...filters,
      male: !filters.male,
    });
  };

  const setOlder = (e) => {
    e.preventDefault();
    setFilters({ ...filters, older: e.target.value });
  };

  const setYounger = (e) => {
    e.preventDefault();
    setFilters({ ...filters, younger: e.target.value });
  };

  return (
    <div className="controls">
      <div className="filters">
        <h2>Filters</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label>Female</label>
          <input type="checkbox" value={filters.female} onChange={toggleFemale} />
          <label>Male</label>
          <input type="checkbox" value={filters.male} onChange={toggleMale} />
          <label>Older Than</label>
          <input type="number" value={filters.older} onChange={setOlder} />
          <label>Younger Than</label>
          <input type="number" value={filters.younger} onChange={setYounger} />
        </form>
      </div>
      <div className="actions">
        <button dataType="csv" onClick={downloadData}>
          Download CSV
        </button>
        <button dataType="json" onClick={downloadData}>
          Download JSON
        </button>
        <button onClick={refreshData}>Refresh Dataset</button>
        <p style={{ fontSize: '20px' }}>Be careful how many times and how quickly you refresh the dataset. You will be locked out of the API.</p>
      </div>
    </div>
  );
};

export default Controls;
