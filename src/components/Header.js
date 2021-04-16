import React from 'react';
import HowTo from './HowTo';
import Title from './Title';

const Header = (props) => {
  return (
    <div className="flex">
      <Title />
      <HowTo />
      <div id="appointments-num">
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
