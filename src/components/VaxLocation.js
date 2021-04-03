import React from 'react';
import { shell } from 'electron';
import Location from './Location';

class VaxLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(link) {
    shell.openExternal(link);
  }

  render() {
    const location = this.props.location;
    return (
      <Location
        alert={false}
        location={location}
        handleClick={this.handleClick}
      />
    );
  }
}

export default VaxLocation;
