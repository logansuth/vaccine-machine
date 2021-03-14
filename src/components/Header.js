import React from 'react';

const Header = (props) => {
  return (
    <div>
      <h1>Vaccine Machine</h1>
      <div id="appointments">
        There are appointments at {props.vaxLocations.length} locations.
      </div>
    </div>
  );
};

export default Header;
