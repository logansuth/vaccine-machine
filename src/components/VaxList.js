import React from 'react';
import VaxLocation from './VaxLocation';
import AlertLocation from './AlertLocation';

class VaxList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    const vaxLocations = this.props.vaxLocations ? this.props.vaxLocations : [];
    const alertLocations = this.props.alertLocations
      ? this.props.alertLocations
      : [];
    return (
      <div className="flex" id="vax-list">
        {alertLocations.map((location, index) => {
          return <AlertLocation key={index} location={location} />;
        })}
        {vaxLocations.map((location, index) => {
          return <VaxLocation key={index} location={location} />;
        })}
      </div>
    );
  }
}

export default VaxList;
