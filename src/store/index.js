import { createStore } from 'redux';

const GET_LOCATIONS = 'GET_LOCATIONS';
const NEW_ALERTS = 'NEW_ALERTS';

export const getLocations = (locationsObj) => ({
  type: GET_LOCATIONS,
  locationsObj,
});

export const newAlerts = (alertObj) => ({
  type: NEW_ALERTS,
  alertObj,
});

const initialState = {
  locations: [],
  alerts: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATIONS: {
      const locationsArr = [];
      const locationsObj = action.locationsObj;

      for (let key in locationsObj) {
        locationsArr.push(locationsObj[key]);
      }

      return { ...state, locations: locationsArr };
    }
    case NEW_ALERTS: {
      const alertArr = [];
      const alertObj = action.alertObj;

      for (let key in alertObj) {
        alertArr.push(alertObj[key]);
      }

      return { ...state, alerts: alertArr };
    }
    default:
      return state;
  }
};

export default createStore(rootReducer);
