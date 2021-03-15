import React from 'react';
import { updateFilters } from '../store';
import { connect } from 'react-redux';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondDose: true,
      sixtyPlus: true,
      teacher: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    console.log('event in event handler—————————', evt);
    this.setState(
      {
        [evt.target.name]: !this.state[evt.target.name],
      },
      () => {
        this.props.changeFilters(this.state);
      }
    );
  }

  render() {
    console.log('this.state in filter———————', this.state);
    return (
      <div>
        <form>
          <label>
            Second Dose:
            <input
              name="secondDose"
              type="checkbox"
              checked={this.state.secondDose}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Age 60+:
            <input
              name="sixtyPlus"
              type="checkbox"
              checked={this.state.sixtyPlus}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Teacher:
            <input
              name="teacher"
              type="checkbox"
              checked={this.state.teacher}
              onChange={this.handleChange}
            />
          </label>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeFilters: (filterObj) => dispatch(updateFilters(filterObj)),
});

export default connect(null, mapDispatchToProps)(Filter);
