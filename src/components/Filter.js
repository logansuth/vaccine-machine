import React from 'react';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  handleChange(evt) {}

  render() {
    return (
      <div>
        <select value="none" onChange={this.handleChange}>
          <option value="second dose">second dose</option>
          <option value="60+">60+</option>
          <option value="teacher">teacher</option>
        </select>
      </div>
    );
  }
}

export default Filter;
