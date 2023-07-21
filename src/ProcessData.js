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

  const csvData = [];

  for (let person of userData) {
    if (checkFilters(person, filters)) {
      tickOnce(processed, person);
      csvData.push(convertToCsvFormat(person));
    }
  }
  return [processed, csvData];
};

/**
 * Converts Person Object to CSV Digestible format
 * @param {Object} person User Details
 */
const convertToCsvFormat = (person) => {
  //TODO: Clean Data
  const converted = {
    name: `${person.name.first} ${person.name.last}`,
    title: person.name.title,
    dob: person.dob.date,
    age: person.dob.age,
    email: person.email,
    location: `${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state}, ${person.location.country}`,
    username: person.login.username,
    phone: person.phone,
  };
  return converted;
};

/**
 * Gets CSV Headers for CSV Download Function
 * @returns {Array} CSV Headers
 */
export const getCsvHeaders = () => {
  const csvHeaders = ['name', 'title', 'dob', 'age', 'email', 'location', 'username', 'phone'];
  return csvHeaders;
};

/**
 * Tally relevant info for person
 * @param {Object} processed Aggregate Data
 * @param {Object} person Person Details
 */
const tickOnce = (processed, person) => {
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
