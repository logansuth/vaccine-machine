import React from 'react';
import { connect } from 'react-redux';

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
      <div>
        {Object.keys(vaxLocations).map((location, index) => {
          return <div key={index}>{location}</div>;
        })}
      </div>
    );
  }
}

const mapState = (state) => ({
  vaxLocations: state,
});

export default connect(mapState)(VaxList);
