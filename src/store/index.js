import { createStore } from 'redux';

const GET_LOCATIONS = 'GET_LOCATIONS';

export const getLocations = (locations) => ({
  type: GET_LOCATIONS,
  locations,
});

const initialState = {};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATIONS:
      return action.locations;
    default:
      return state;
  }
};

export default createStore(rootReducer);
