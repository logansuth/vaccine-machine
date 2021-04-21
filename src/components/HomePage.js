import React from 'react';
import Header from './Header';
import VaxList from './VaxList';
import { connect } from 'react-redux';
import Icon from './Icon';

const HomePage = (props) => {
  return (
    <div>
      <Header />
      <VaxList
        vaxLocations={props.vaxLocations}
        alertLocations={props.alertLocations}
        types={props.types}
      />
      <Icon />
    </div>
  );
};

const mapState = (state) => ({
  vaxLocations: state.filteredLocations,
  alertLocations: state.filteredAlerts,
  types: state.types,
});

export default connect(mapState)(HomePage);
