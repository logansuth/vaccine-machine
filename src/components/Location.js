import React from 'react';

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
    </div>
  );
};

export default Location;
