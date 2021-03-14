import React from 'react';
import { connect } from 'react-redux';
import { shell } from 'electron';

class VaxList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      VaxList: [],
      loading: true,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(link) {
    shell.openExternal(link);
  }

  render() {
    const vaxLocations = this.props.vaxLocations ? this.props.vaxLocations : {};
    console.log('this.props———————', this.props);
    console.log('vaxLocations—————', vaxLocations);
    return (
      <div>
        {vaxLocations.map((location, index) => {
          return (
            <div key={index} onClick={() => this.handleClick(location.link)}>
              {location.name}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => ({
  vaxLocations: state,
});

export default connect(mapState)(VaxList);
