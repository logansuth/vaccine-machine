import React from 'react';

const Location = (props) => {
  const { location, alert, handleClick } = props;
  const classNames = alert
    ? 'alert vax-location external-link vax-name'
    : 'vax-location external-link vax-name';

  return (
    <div className="location">
      <span className={classNames} onClick={() => handleClick(location.link)}>
        {location.name}
      </span>
      <div className="updated-at">{location.updatedAt}</div>
    </div>
  );
};

export default Location;
