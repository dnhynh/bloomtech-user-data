import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import GenderChart from './components/GenderChart';
import Overview from './components/Overview';
import { parseData } from './ProcessData';
import AgeChart from './components/AgeChart';
import Controls from './components/Controls';

const App = () => {
  const [rawData, setRawData] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [processedData, setProcessedData] = useState({});
  const [filters, setFilters] = useState({
    male: false,
    female: false,
    older: 0,
    younger: 0,
  });

  /**
   * Fetch User Data on Page Load
   * Will check local storage first and if no data is found, will fetch from API
   */
  const getUserData = () => {
    const cache = localStorage.getItem('userData');
    if (!cache) {
      axios
        .get('https://randomuser.me/api/?results=2500')
        .then((res) => {
          localStorage.setItem('userData', JSON.stringify(res.data.results));
          setRawData(res.data.results);
        })
        .catch((e) => console.log('error', e));
    } else {
      setRawData(JSON.parse(cache));
    }
  };

  /**
   * Clear Local Storage and Refetch Data from API
   */
  const refreshData = () => {
    localStorage.removeItem('userData');
    getUserData();
  };

  // Parse data when raw data or filter values change
  useEffect(() => {
    const [processed, csvData] = parseData(rawData, filters);
    setProcessedData(processed);
    setCsvData(csvData);
  }, [rawData, filters]);

  /**
   * Fetch User Data on Page Load
   */
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="App">
      <div className="nav">
        <h1>BloomTech - Users</h1>
      </div>
      <Overview data={processedData} />
      <div className="main-body">
        <GenderChart data={processedData} />
        <AgeChart data={processedData} />
      </div>
      <Controls data={processedData} csvData={csvData} filters={filters} setFilters={setFilters} refreshData={refreshData} />
    </div>
  );
};

export default App;
