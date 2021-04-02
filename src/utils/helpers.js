const axios = require('axios');

async function getData() {
  try {
    console.log('IN GETDATA————————');
    const { data } = await axios.get('https://nycvaccinelist.com/');

    const startIndex = data.indexOf('text-gray-500 inline-block');
    const stopIndex = data.indexOf('Manually checked');

    return { data, startIndex, stopIndex };
  } catch (err) {
    console.log('error in getData func', err);
  }
}

function findString(data, searchTerms, beginningIndex, variableName) {
  console.log('IN FIND STRING———————————');
  console.log('BEGINNING INDEX IN FIND STRING————', beginningIndex);
  const preStartIndex = data.indexOf(searchTerms[0], beginningIndex);
  console.log('PRESTART INDEX IN FIND STRING—————', preStartIndex);

  const startIndex = data.indexOf(searchTerms[1], preStartIndex) + 1;
  console.log('START INDEX in FIND STRING—————', startIndex);

  const endIndex = data.indexOf(searchTerms[2], startIndex);
  console.log('END INDEX IN FIND STRING————', endIndex);

  return {
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
};
