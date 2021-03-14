import { createStore } from 'redux';

const GET_LOCATIONS = 'GET_LOCATIONS';

export const getLocations = (locationsObj) => ({
  type: GET_LOCATIONS,
  locationsObj,
});

const initialState = [];

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATIONS: {
      const locationsArr = [];
      const locationsObj = action.locationsObj;

      for (let key in locationsObj) {
        locationsArr.push(locationsObj[key]);
      }

      return locationsArr;
    }
    default:
      return state;
  }
};

export default createStore(rootReducer);
