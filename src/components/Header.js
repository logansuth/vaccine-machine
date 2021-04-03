import React from 'react';

const Header = (props) => {
  return (
    <div className="flex">
      <span id="header" className="flex">
        <h1>Vaccine Machine</h1>
        <h2>
          Data from: &nbsp;
          <a href="https://www.nycvaccinelist.com/">NYC Vaccine List</a>
        </h2>
      </span>
      <br></br>
      <br></br>
      <div id="appointments">
        There are appointments at
        <span className="alert">
          {' '}
          {props.vaxLocations.length + props.alertLocations.length}{' '}
        </span>
        locations.
      </div>
    </div>
  );
};

export default Header;
