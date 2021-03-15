const axios = require('axios');

async function getData() {
  try {
    const { data } = await axios.get('https://nycvaccinelist.com/');

    const startIndex = data.indexOf('text-gray-500 inline-block');
    const stopIndex = data.indexOf('have openings');

    return { data, startIndex, stopIndex };
  } catch (err) {
    console.log('error in getData func', err);
  }
}

function findString(data, searchTerms, beginningIndex, variableName) {
  const preStartIndex = data.indexOf(searchTerms[0], beginningIndex);

  const startIndex = data.indexOf(searchTerms[1], preStartIndex) + 1;

  const endIndex = data.indexOf(searchTerms[2], startIndex);

  return {
    [variableName]: data.slice(startIndex, endIndex),
    [variableName + 'EndIndex']: endIndex,
  };
}

function parseAppointments(apptString) {
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

  if (name.indexOf('Second Dose'))
}

module.exports = {
  getData,
  findString,
  parseAppointments,
};
