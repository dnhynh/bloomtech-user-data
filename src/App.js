import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import GenderChart from './components/GenderChart';
import { eu_countries } from './data/eu_countries';
import { parseData } from './Helpers';

const App = () => {
  const [rawData, setRawData] = useState([]);
  const [processedData, setProcessedData] = useState({});

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
        })
        .catch((e) => console.log('error', e));
    } else {
      setRawData(JSON.parse(cache));
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    const processed = parseData(rawData);
    setProcessedData(processed);
  }, [rawData]);

  return (
    <div className="App">
      <div className="nav">
        <h1>User Data</h1>
      </div>
      <GenderChart data={processedData} />
    </div>
  );
};

export default App;
