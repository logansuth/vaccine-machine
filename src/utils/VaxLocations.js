const {
  findString,
  parseAppointments,
  findTypes,
  findLink,
} = require('./helpers');
const VaxLocation = require('./locationClass');

const UPDATED_AT_SEARCH_TERMS = ['text-gray-500 inline-block', '>', '<'];

const NAME_SEARCH_TERMS = [
  'w-full sm:flex-grow text-xl sm:text-2xl font-bold block notranslate cursor-pointer hover:text-blue-800',
  '>',
  '<',
];

const ADDRESS_SEARCH_TERMS = [`rel="nofollow noopener noreferrer"`, '>', '<'];

const APPOINTMENTS_SEARCH_TERMS = [
  `<span class="font-bold text-gray-700"`,
  'gray',
  '</ul>',
];

const NOTES_SEARCH_TERMS = [
  `</button></div><div class="text-gray-600 pt-2 text-lg">`,
  '<span>',
  '</span>',
];

function compareLocationData(oldData, newData) {
  /*  First delete any keys in oldData that do not exist in newData
  Then for keys that DO exist, update with new data
  Else if they DON'T exist, add them to the oldData, and keep track of the updates for alert purposes=
  */
  const alertWorthy = {};

  for (let key in oldData) {
    if (!newData[key]) {
      delete oldData[key];
    }
  }

  for (let key in newData) {
    if (oldData[key]) {
      oldData[key] = newData[key];
    } else {
      oldData[key] = newData[key];
      alertWorthy[key] = newData[key];
    }
  }

  return alertWorthy;
}

function populateLocations(data, startIndices, stopIndex) {
  const newVaxLocations = {};

  let startIndex = startIndices.shift();
  let endIndex = startIndices[0];

  while (startIndex < endIndex) {
    const { updatedAt, updatedAtEndIndex } = findString(
      data,
      UPDATED_AT_SEARCH_TERMS,
      startIndex,
      'updatedAt',
      endIndex
    );

    console.log('UPDATED AT—————', updatedAt);

    const { name, nameEndIndex } = findString(
      data,
      NAME_SEARCH_TERMS,
      updatedAtEndIndex,
      'name',
      endIndex
    );

    console.log('NAME——————', name);

    const { address, addressEndIndex } = findString(
      data,
      ADDRESS_SEARCH_TERMS,
      nameEndIndex,
      'address',
      endIndex
    );

    console.log('ADDRESS————', address);

    let { appointments, appointmentsEndIndex } = findString(
      data,
      APPOINTMENTS_SEARCH_TERMS,
      addressEndIndex,
      'appointments',
      endIndex
    );

    appointments = parseAppointments(appointments);

    console.log('APPTS———————', appointments);

    let { found, notes } = findString(
      data,
      NOTES_SEARCH_TERMS,
      appointmentsEndIndex,
      'notes',
      endIndex
    );

    console.log('NOTES—————', notes);

    if (found) {
      notes = notes.slice(6, notes.length - 1);
    } else {
      notes = null;
    }

    const link = findLink(name);

    console.log('LINK——————', link);

    const types = findTypes(name);

    console.log('TYPES ——————', types);

    const newVaxLocation = new VaxLocation(
      updatedAt,
      name,
      address,
      appointments,
      notes,
      link,
      types
    );

    newVaxLocations[name] = newVaxLocation;

    startIndex = startIndices.shift();
    endIndex = startIndices[0] || stopIndex;
  }

  return newVaxLocations;
}

module.exports = {
  compareLocationData,
  populateLocations,
};
