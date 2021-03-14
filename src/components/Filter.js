import React from 'react';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      county: [],
      types: [],
      loading: true,
    };
  }

  render() {
    return <div>Here is where you'll filter</div>;
  }
}

export default Filter;
