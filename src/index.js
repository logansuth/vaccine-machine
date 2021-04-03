import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';

import store, {
  getLocations,
  newAlerts,
  updateAlerts,
  applyFilters,
} from './store';

import { ipcRenderer, shell } from 'electron';

ipcRenderer.send('initial', 'requesting initial data');

ipcRenderer.on('initial', (event, data) => {
  new Notification('Appointments Available', {
    body: `There are appointments available at ${
      Object.keys(data).length
    } locations.`,
  });
  store.dispatch(getLocations(data));
  store.dispatch(applyFilters());
});

ipcRenderer.on('update', (event, data) => {
  const vaxLocations = data.vaxLocations;
  const alertLocations = data.alertLocations;
  const alertKeys = Object.keys(alertLocations);

  if (alertKeys.length) {
    const alertNotification = new Notification('NEW Appointments Available', {
      body: `NEW! There are appointments available at ${alertKeys.length} NEW locations.`,
    });

    alertNotification.onclick = () => {
      shell.openExternal(data.alertLocations[alertKeys[0]].link);
    };

    store.dispatch(newAlerts(alertLocations));
  }

  store.dispatch(getLocations(vaxLocations));
  store.dispatch(updateAlerts());
  store.dispatch(applyFilters());
});

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div');

root.id = 'root';
document.body.appendChild(root);

// Now we can render our application into it
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
