import React from 'react';
import Info from './Info';

class HowTo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    return (
      <div>
        <div
          id="how-to-button"
          className="external-link"
          onClick={this.handleClick}
        >
          How To Use This App
        </div>
        {this.state.show ? <Info /> : ''}
      </div>
    );
  }
}

export default HowTo;
