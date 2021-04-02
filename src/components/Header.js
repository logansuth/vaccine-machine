import React from 'react';

const Header = (props) => {
  return (
    <div className="flex">
      <h1>Vaccine Machine</h1>
      <h2>All data from:</h2>
      <a href="https://www.nycvaccinelist.com/">NYC Vaccine List</a>
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
