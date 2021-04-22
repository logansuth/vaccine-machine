const axios = require('axios');
const amIEligibleLocations = require('./amIEligibleLocations');
const vax4nycLocations = require('./vax4nycLocations');

async function getData() {
  try {
    const { data } = await axios.get('https://nycvaccinelist.com/');

    return data;
  } catch (err) {
    console.error('error in getData func', err);
  }
}

function findIndices(data) {
  const stopIndex = data.indexOf('NYC In-Home Vaccinations') - 292;

  const startIndices = [];

  let startIndex = data.indexOf('Call the hotline at 1-833-NYS-4-VAX');

  while (startIndex < stopIndex && startIndex !== -1) {
    startIndex = data.indexOf('text-gray-500 inline-block', startIndex + 1);

    if (startIndex > -1 && startIndex < stopIndex)
      startIndices.push(startIndex);
  }

  return [startIndices, stopIndex];
}

function findString(
  data,
  searchTerms,
  beginningIndex,
  variableName,
  stopIndex
) {
  const preStartIndex = data.indexOf(searchTerms[0], beginningIndex);

  if (preStartIndex < 0 || preStartIndex > stopIndex) return { found: false };

  const startIndex = data.indexOf(searchTerms[1], preStartIndex) + 1;

  if (startIndex < 0 || startIndex > stopIndex) return { found: false };

  const endIndex = data.indexOf(searchTerms[2], startIndex);

  if (endIndex < 0 || endIndex > stopIndex) return { found: false };

  return {
    found: true,
    [variableName]: data.slice(startIndex, endIndex),
    [variableName + 'EndIndex']: endIndex,
  };
}

function parseAppointments(apptString) {
  if (apptString === undefined) {
    apptString = '';
  }

  const apptsArray = [];
  let startIndex = 0;

  while (startIndex < apptString.length) {
    startIndex = apptString.indexOf('700', startIndex);
    if (startIndex === -1) break;
    startIndex = startIndex + 5;

    const middleIndex = apptString.indexOf('<', startIndex);

    const endIndex = apptString.indexOf('</li>', middleIndex) - 1;

    const newAppt =
      apptString.slice(startIndex, middleIndex) +
      apptString.slice(middleIndex + 7, endIndex);

    apptsArray.push(newAppt);

    startIndex = endIndex;
  }

  return apptsArray;
}

function findTypes(name) {
  const types = [];

  if (name.indexOf('Second Dose') > -1) types.push('secondDose');

  if (name.indexOf('60+') > -1) types.push('sixtyPlus');

  if (name.indexOf('teachers') > -1) types.push('teacher');

  return types;
}

function findLink(name) {
  const index = name.indexOf('(');

  if (index > -1) name = name.slice(0, index - 1);

  if (name.indexOf('Walgreens') > -1 || name.indexOf('Duane Reade') > -1) {
    return 'https://www.walgreens.com/topic/promotion/covid-vaccine.jsp';
  } else if (name.indexOf('CVS') > -1) {
    return 'https://www.cvs.com/vaccine/intake/store/covid-screener/covid-qns';
  } else if (name.indexOf('Rite Aid') > -1) {
    return 'https://www.riteaid.com/pharmacy/covid-qualifier';
  } else if (amIEligibleLocations.includes(name)) {
    return 'https://am-i-eligible.covid19vaccine.health.ny.gov/';
  } else if (vax4nycLocations.includes(name)) {
    return 'https://vax4nyc.nyc.gov/patient/s/';
  } else if (name.indexOf('Belle Mead') > -1) {
    return 'https://www.bellemeadrx.com/bookings-checkout/covid-19-vaccine/book';
  } else if (
    name.indexOf('Westchester Chappaqua Crossing') > -1 ||
    name.indexOf('Suffolk- Dolan Center') > -1
  ) {
    return 'https://northwellvaccine.force.com/s/?id=a1T4x000007TQSKEA4';
  } else {
    return 'https://epicmychart.nychhc.org/MyChart/Authentication/Login?';
  }
}

module.exports = {
  getData,
  findString,
  parseAppointments,
  findTypes,
  findIndices,
  findLink,
};
