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
        types={props.types}
      />
      <Filter />
      <VaxList
        vaxLocations={props.vaxLocations}
        alertLocations={props.alertLocations}
        types={props.types}
      />
    </div>
  );
};

const mapState = (state) => ({
  vaxLocations: state.filteredLocations,
  alertLocations: state.filteredAlerts,
  types: state.types,
});

export default connect(mapState)(HomePage);
