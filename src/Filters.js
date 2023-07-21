export const checkFilters = (user, filters) => {
  return checkGender(user, filters) && checkAge(user, filters);
};

/**
 * Check if user passes Gender Filter
 * @param {Object} user User Info
 * @param {Object} filters filter state
 * @returns
 */
const checkGender = (user, filters) => {
  if (filters['male'] && filters['female']) {
    return true;
  }
  if (filters['male']) {
    return user.gender === 'male';
  }
  if (filters['female']) {
    return user.gender === 'female';
  }
  return true;
};

const checkAge = (user, filters) => {
  const { older, younger } = filters;
  const age = user.dob.age;
  if (older && younger) {
    return age > older && age < younger;
  }
  if (older) {
    return age > filters['older'];
  }
  if (younger) {
    return age < filters['younger'];
  }
  return true;
};
