import React from 'react';
import { connect } from 'react-redux';

const NumberOfApts = (props) => {
  return (
    <div id="appointments-num">
      There are appointments at
      <span id="number-apts">
        {' '}
        {props.vaxLocations.length + props.alertLocations.length}{' '}
      </span>
      locations.
    </div>
  );
};

const mapState = (state) => ({
  vaxLocations: state.locations,
  alertLocations: state.alerts,
});

export default connect(mapState)(NumberOfApts);
