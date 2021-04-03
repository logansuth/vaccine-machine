import React from 'react';

const Appointment = (props) => {
  const { appointment } = props;

  return <div className="appointment">{appointment}</div>;
};

export default Appointment;
