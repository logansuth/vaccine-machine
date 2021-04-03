import React from 'react';
import { shell } from 'electron';
import Location from './Location';

class AlertLocation extends React.Component {
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
        alert={true}
        location={location}
        handleClick={this.handleClick}
      />
    );
  }
}

export default AlertLocation;
