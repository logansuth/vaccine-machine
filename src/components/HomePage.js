import React from 'react';
import Header from './Header';
import Filter from './Filter';
import VaxList from './VaxList';
import { connect } from 'react-redux';

const HomePage = (props) => {
  return (
    <div>
      <Header vaxLocations={props.vaxLocations} />
      <Filter />
      <VaxList vaxLocations={props.vaxLocations} />
    </div>
  );
};

const mapState = (state) => ({
  vaxLocations: state.locations,
});

export default connect(mapState)(HomePage);
