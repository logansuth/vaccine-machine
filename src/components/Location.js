import React from 'react';
import Appointment from './Appointment';

const Location = (props) => {
  const { location, alert, handleClick } = props;
  const sharedClasses = 'vax-location external-link vax-name';
  const classNames = alert ? sharedClasses + ' alert' : sharedClasses;

  return (
    <div className="location">
      <div>
        <span className={classNames} onClick={() => handleClick(location.link)}>
          {location.name}
        </span>
        &nbsp; &nbsp; &nbsp;
        <span className="updated-at">{location.updatedAt}</span>
      </div>
      <div className="address">{location.address}</div>
      <div className="appointments">
        Appointments:
        {location.appointments.map((appointment) => (
          <Appointment appointment={appointment} />
        ))}
      </div>
    </div>
  );
};

export default Location;
