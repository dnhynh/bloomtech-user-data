import React from 'react';

const Controls = ({ refreshData, filters, setFilters }) => {
  const downloadData = () => {};

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
          onSubmit={() => {
            console.log('dummy');
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
          {/* <input className="filters-button" type="submit" value="Apply Filters" /> */}
        </form>
      </div>
      <div className="actions">
        <button onClick={downloadData}>Download Data</button>
        <button onClick={refreshData}>Refresh Dataset</button>
        <p style={{ fontSize: '20px' }}>Be careful how many times and how quickly you refresh the dataset. You will be locked out of the API.</p>
      </div>
    </div>
  );
};

export default Controls;
