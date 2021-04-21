import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';

import store, { getLocations, newAlerts, updateAlerts } from './store';

import { ipcRenderer, shell } from 'electron';

ipcRenderer.send('initial', 'requesting initial data');

ipcRenderer.on('initial', (event, data) => {
  new Notification('Appointments Available', {
    body: `There are appointments available at ${
      Object.keys(data).length
    } locations.`,
  });
  store.dispatch(getLocations(data));
});

ipcRenderer.on('update', (event, data) => {
  const { vaxLocations, alertLocations } = data;
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
});

let root = document.createElement('div');

root.id = 'root';
document.body.appendChild(root);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
