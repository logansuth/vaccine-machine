import React from 'react';
import HowTo from './HowTo';
import Title from './Title';
import NumberOfApts from './NumberOfApts';

const Header = () => {
  return (
    <div className="flex">
      <Title />
      <HowTo />
      <NumberOfApts />
    </div>
  );
};

export default Header;
