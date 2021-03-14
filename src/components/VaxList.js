import React from 'react';

class VaxList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      VaxList: [],
      loading: true,
    };
  }

  render() {
    return <div>Here is where the vaccine locations will go.</div>;
  }
}

export default VaxList;
