import React from 'react';
import { shell } from 'electron';

const Header = (props) => {
  return (
    <div className="flex">
      <span id="header" className="flex">
        <h1>Vaccine Machine</h1>
        <h2>
          Data from: &nbsp;
          <span
            className="external-link"
            onClick={() => shell.openExternal('https://nycvaccinelist.com/')}
          >
            NYC Vaccine List
          </span>
          &nbsp;
        </h2>
      </span>
      <br></br>
      <br></br>
      <div id="appointments">
        There are appointments at
        <span id="number-apts">
          {' '}
          {props.vaxLocations.length + props.alertLocations.length}{' '}
        </span>
        locations.
      </div>
    </div>
  );
};

export default Header;
