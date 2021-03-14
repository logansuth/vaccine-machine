import React from 'react';
import { connect } from 'react-redux';
import VaxLocation from './VaxLocation';

class VaxList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      VaxList: [],
      loading: true,
    };
  }

  render() {
    const vaxLocations = this.props.vaxLocations ? this.props.vaxLocations : {};
    console.log('this.props———————', this.props);
    console.log('vaxLocations—————', vaxLocations);
    return (
      <ul>
        {vaxLocations.map((location, index) => {
          return <VaxLocation key={index} location={location} />;
        })}
      </ul>
    );
  }
}

const mapState = (state) => ({
  vaxLocations: state,
});

export default connect(mapState)(VaxList);
