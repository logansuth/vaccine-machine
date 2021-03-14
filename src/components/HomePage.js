import React from 'react';
import Header from './Header';
import Filter from './Filter';
import VaxList from './VaxList';

const HomePage = () => {
  return (
    <div>
      <Header />
      <Filter />
      <VaxList />
    </div>
  );
};

export default HomePage;
