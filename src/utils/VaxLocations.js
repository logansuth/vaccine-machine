const { findString, parseAppointments } = require('./helpers');
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
  `aria-hidden="true" class="pencil icon"`,
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

  console.log(new Date());

  return alertWorthy;
}

function populateLocations(data, startIndex, stopIndex) {
  const newVaxLocations = {};

  while (startIndex < stopIndex) {
    const { updatedAt, updatedAtEndIndex } = findString(
      data,
      UPDATED_AT_SEARCH_TERMS,
      startIndex,
      'updatedAt'
    );
    console.log('updatedAt——————', updatedAt);

    const { name, nameEndIndex } = findString(
      data,
      NAME_SEARCH_TERMS,
      updatedAtEndIndex,
      'name'
    );
    console.log('name', name);

    const { address, addressEndIndex } = findString(
      data,
      ADDRESS_SEARCH_TERMS,
      nameEndIndex,
      'address'
    );
    console.log('address', address);

    // const link = findString(data);
    // const type;
    // const wheelchairAccess;

    let { appointments, appointmentsEndIndex } = findString(
      data,
      APPOINTMENTS_SEARCH_TERMS,
      addressEndIndex,
      'appointments'
    );
    console.log('apts————————', appointments);

    appointments = parseAppointments(appointments);

    let { notes, notesEndIndex } = findString(
      data,
      NOTES_SEARCH_TERMS,
      appointmentsEndIndex,
      'notes'
    );
    notes = notes.slice(6, notes.length - 1);
    console.log('notes—————————', notes);

    const newVaxLocation = new VaxLocation(
      updatedAt,
      name,
      address,
      appointments,
      notes
    );

    newVaxLocations[name] = newVaxLocation;

    startIndex = notesEndIndex;
  }

  return newVaxLocations;
}

module.exports = {
  compareLocationData,
  populateLocations,
};
