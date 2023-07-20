export const parseData = (userData) => {
  const processed = {
    male: 0,
    female: 0,
    age: {},
    country: {},
  };
  for (let person of userData) {
    tickGender(processed, person);
    tickCountry(processed['country'], person.location.country);
    tickAge(processed['age'], person.dob.age);
  }
  console.log('processed: ', processed);
  return processed;
};

const tickCountry = (currentTracked, country) => {
  if (currentTracked[country]) {
    currentTracked[country] += 1;
  } else {
    currentTracked[country] = 1;
  }
};

const tickGender = (data, person) => {
  if (person.gender === 'female') {
    data['female'] += 1;
  } else {
    data['male'] += 1;
  }
};

const tickAge = (data, age) => {
  if (data[age]) {
    data[age] += 1;
  } else {
    data[age] = 1;
  }
};
