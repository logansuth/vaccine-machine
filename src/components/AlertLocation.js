import React from 'react';
import { shell } from 'electron';

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
      <div>
        <div
          className="alert vax-location"
          onClick={() => this.handleClick(location.link)}
        >
          {location.name}
        </div>
      </div>
    );
  }
}

export default AlertLocation;
