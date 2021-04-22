import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { convertObjToArr } from './helpers';

const GET_LOCATIONS = 'GET_LOCATIONS';
const NEW_ALERTS = 'NEW_ALERTS';
const UPDATE_ALERTS = 'UPDATE_ALERTS';

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

const initialState = {
  locations: [],
  alerts: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATIONS: {
      const locationsArr = convertObjToArr(action.locationsObj);

      return { ...state, locations: locationsArr };
    }
    case NEW_ALERTS: {
      const alertArr = convertObjToArr(action.alertObj);

      return { ...state, alerts: alertArr };
    }
    case UPDATE_ALERTS: {
      const locationsMinusAlerts = state.locations.filter((location) => {
        const alertNames = state.alerts.map((alert) => alert.name);

        const indexOfLocation = alertNames.indexOf(location.name);

        return indexOfLocation < 0;
      });

      const alertsMinusLocations = state.alerts.filter((alert) => {
        const locationNames = state.locations.map((location) => location.name);

        const indexOfAlert = locationNames.indexOf(alert.name);

        return indexOfAlert > -1;
      });

      return {
        ...state,
        locations: locationsMinusAlerts,
        alerts: alertsMinusLocations,
      };
    }
    default:
      return state;
  }
};

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(createLogger({ collapsed: true })))
);
