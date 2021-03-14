import React from 'react';
import VaxLocation from './VaxLocation';
import AlertLocation from './AlertLocation';

class VaxList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      VaxList: [],
      loading: true,
    };
  }

  render() {
    const vaxLocations = this.props.vaxLocations ? this.props.vaxLocations : [];
    const alertLocations = this.props.alertLocations
      ? this.props.alertLocations
      : [];
    console.log('this.props———————', this.props);
    console.log('vaxLocations—————', vaxLocations);
    return (
      <ul>
        {alertLocations.map((location, index) => {
          return <AlertLocation key={index} location={location} />;
        })}
        {vaxLocations.map((location, index) => {
          return <VaxLocation key={index} location={location} />;
        })}
      </ul>
    );
  }
}

export default VaxList;
