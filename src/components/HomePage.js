import React from 'react';
import Header from './Header';
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
      <VaxList
        vaxLocations={props.vaxLocations}
        alertLocations={props.alertLocations}
        types={props.types}
      />
      <div id="copyright">
        <div>
          Icon made by{' '}
          <a href="https://www.freepik.com" title="Freepik">
            Freepik
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => ({
  vaxLocations: state.filteredLocations,
  alertLocations: state.filteredAlerts,
  types: state.types,
});

export default connect(mapState)(HomePage);
