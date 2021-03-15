import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

const GET_LOCATIONS = 'GET_LOCATIONS';
const NEW_ALERTS = 'NEW_ALERTS';
const UPDATE_ALERTS = 'UPDATE_ALERTS';
const UPDATE_FILTERS = 'UPDATE_FILTERS';

export const getLocations = (locationsObj) => ({
  type: GET_LOCATIONS,
  locationsObj,
});

export const newAlerts = (alertObj) => ({
  type: NEW_ALERTS,
  alertObj,
});

export const updateAlerts = () => ({
  type: UPDATE_ALERTS,
});

export const updateFilters = (filterObj) => ({
  type: UPDATE_FILTERS,
  filterObj,
});

const initialState = {
  locations: [],
  alerts: [],
  types: ['secondDose', 'teacher', 'sixtyPlus'],
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
    case UPDATE_ALERTS: {
      const locationsMinusAlerts = state.locations.filter((location) => {
        const locationName = location.name;

        const alertNames = state.alerts.map((alert) => alert.name);

        const indexOfLocation = alertNames.indexOf(locationName);

        return indexOfLocation < 0;
      });

      const alertsMinusLocations = state.alerts.filter((alert) => {
        const alertName = alert.name;
        const locationNames = state.locations.map((location) => location.name);

        const indexOfAlert = locationNames.indexOf(alertName);

        return indexOfAlert > -1;
      });

      return {
        ...state,
        locations: locationsMinusAlerts,
        alerts: alertsMinusLocations,
      };
    }
    case UPDATE_FILTERS: {
      const types = [];
      const filterObj = action.filterObj;

      for (let key in filterObj) {
        if (filterObj[key]) types.push(key);
      }

      return { ...state, types: types };
    }
    default:
      return state;
  }
};

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(createLogger({ collapsed: true })))
);
