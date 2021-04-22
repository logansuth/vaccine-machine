class VaxLocation {
  constructor(updatedAt, name, address, appointments, notes, link, types) {
    this.updatedAt = updatedAt;
    this.name = name;
    this.address = address;
    this.appointments = appointments;
    this.notes = notes;
    this.link = link;
    this.types = types;
  }
}

module.exports = VaxLocation;
