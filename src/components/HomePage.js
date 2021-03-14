import React from 'react';
import Header from './Header';
import Filter from './Filter';
import VaxList from './VaxList';
import { connect } from 'react-redux';

const HomePage = (props) => {
  return (
    <div>
      <Header
        vaxLocations={props.vaxLocations}
        alertLocations={props.alertLocations}
      />
      <Filter />
      <VaxList
        vaxLocations={props.vaxLocations}
        alertLocations={props.alertLocations}
      />
    </div>
  );
};

const mapState = (state) => ({
  vaxLocations: state.locations,
  alertLocations: state.alerts,
});

export default connect(mapState)(HomePage);
