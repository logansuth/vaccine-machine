const axios = require('axios');

async function getData() {
  try {
    console.log('IN GETDATA————————');
    const { data } = await axios.get('https://nycvaccinelist.com/');

    return data;
  } catch (err) {
    console.log('error in getData func', err);
  }
}

function findIndices(data) {
  const stopIndex = data.indexOf('Manually checked');

  const startIndices = [];

  let startIndex = 0;

  while (startIndex < stopIndex && startIndex !== -1) {
    startIndex = data.indexOf('text-gray-500 inline-block', startIndex + 1);

    if (startIndex > -1 && startIndex < stopIndex)
      startIndices.push(startIndex);
  }

  console.log('START INDICES—————', startIndices);
  // DO I NEED TO POP OFF THE LAST ONE?

  return [startIndices, stopIndex];
}

function findString(
  data,
  searchTerms,
  beginningIndex,
  variableName,
  stopIndex
) {
  console.log('IN FIND STRING———————————');

  const preStartIndex = data.indexOf(searchTerms[0], beginningIndex);
  console.log('PRESTART INDEX IN FIND STRING—————', preStartIndex);
  if (preStartIndex < 0 || preStartIndex > stopIndex) return { found: false };

  const startIndex = data.indexOf(searchTerms[1], preStartIndex) + 1;
  console.log('START INDEX in FIND STRING—————', startIndex);
  if (startIndex < 0 || startIndex > stopIndex) return { found: false };

  const endIndex = data.indexOf(searchTerms[2], startIndex);
  if (endIndex < 0 || endIndex > stopIndex) return { found: false };
  console.log('END INDEX IN FIND STRING————', endIndex);

  return {
    found: true,
    [variableName]: data.slice(startIndex, endIndex),
    [variableName + 'EndIndex']: endIndex,
  };
}

function parseAppointments(apptString) {
  console.log('IN PARSE APPTS———————————');
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
  console.log('IN FINDTYPES———————');
  const types = [];

  if (name.indexOf('Second Dose') > -1) types.push('secondDose');

  if (name.indexOf('60+') > -1) types.push('sixtyPlus');

  if (name.indexOf('teachers') > -1) types.push('teacher');

  return types;
}

module.exports = {
  getData,
  findString,
  parseAppointments,
  findTypes,
  findIndices,
};
