// class VaxLocation {
//   constructor(
//     updatedAt,
//     name,
//     address,
//     link,
//     type,
//     wheelchairAccess,
//     appointments,
//     notes
//   ) {
//     this.updatedAt = updatedAt;
//     this.name = name;
//     this.address = address;
//     this.link = link;
//     this.type = type;
//     this.wheelchairAccess = wheelchairAccess;
//     this.appointments = appointments;
//     this.notes = notes;
//   }
// }

class VaxLocation {
  constructor(
    updatedAt,
    name,
    address,
    appointments,
    notes,
    link = 'https://vax4nyc.nyc.gov/patient/s/'
  ) {
    this.updatedAt = updatedAt;
    this.name = name;
    this.address = address;
    this.appointments = appointments;
    this.notes = notes;
    this.link = link;
  }
}

module.exports = VaxLocation;
