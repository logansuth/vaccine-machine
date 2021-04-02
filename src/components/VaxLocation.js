import React from 'react';
import { shell } from 'electron';

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
      <li>
        <div>
          <span
            className="vax-location"
            onClick={() => this.handleClick(location.link)}
          >
            {location.name}
          </span>
        </div>
      </li>
    );
  }
}

export default VaxLocation;
