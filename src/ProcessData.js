import { eu_countries } from './data/eu_countries';
import { checkFilters } from './Filters';

/**
 * Parse Raw User Data
 * @param {Object} userData Raw Userdata JSON
 * @returns {Object} Processed Data
 */
export const parseData = (userData, filters) => {
  const processed = {
    total: 0,
    male: 0,
    female: 0,
    age: {},
    country: {},
    avgAge: 0,
    youngest: 0,
    oldest: 0,
    ageTotal: 0,
    eu: 0,
    us: 0,
    other_country: 0,
  };

  for (let person of userData) {
    if (checkFilters(person, filters)) {
      tickOnce(processed, person);
    }
  }
  return processed;
};

/**
 * Tally relevant info for person
 * @param {Object} processed Aggregate Data
 * @param {Object} person Person Details
 */
const tickOnce = (processed, person) => {
  console.log('TICK');
  processed['total'] += 1;
  tickGender(processed, person);
  tickCountry(processed, person.location.country);
  tickAge(processed, person.dob.age);
};

/**
 *  Tally relevant info for country
 * @param {Object} data Aggregate Data
 * @param {*} country Persons Country info
 */
const tickCountry = (data, country) => {
  if (data.country[country]) {
    data.country[country] += 1;
  } else {
    data.country[country] = 1;
  }
  if (eu_countries.includes(country)) {
    data.eu += 1;
  } else if (country === 'United States') {
    data.us += 1;
  } else {
    data.other_country += 1;
  }
};

/**
 * Tally Country Info
 * @param {Object} data Aggregate Data
 * @param {Object} person person details
 */
const tickGender = (data, person) => {
  if (person.gender === 'female') {
    data['female'] += 1;
  } else {
    data['male'] += 1;
  }
};

/**
 * Takes age value and adds relevant info to current count
 * @param {Object} data Current Data Set
 * @param {*} age Age of User
 */
const tickAge = (data, age) => {
  if (data['age'][age]) {
    data.age[age] += 1;
  } else {
    data.age[age] = 1;
  }
  if (age < data['youngest'] || data['youngest'] === 0) {
    data['youngest'] = age;
  }
  if (age > data['oldest']) {
    data['oldest'] = age;
  }
  data['ageTotal'] += age;
};
