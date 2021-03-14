import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';

import store, { getLocations, newAlerts } from './store';

import { ipcRenderer, shell } from 'electron';

ipcRenderer.send('initial', 'requesting initial data');

ipcRenderer.on('initial', (event, data) => {
  console.log('received data');
  new Notification('Appointments Available', {
    body: `There are appointments available at ${
      Object.keys(data).length
    } locations.`,
  });
  store.dispatch(getLocations(data));
});

ipcRenderer.on('initial', (event, data) => {
  console.log('received data');
  store.dispatch(getLocations(data));
});

ipcRenderer.on('update', (event, data) => {
  console.log('received data in update listener');

  const vaxLocations = data.vaxLocations;
  const alertLocations = data.alertLocations;
  const alertKeys = Object.keys(alertLocations);

  if (alertKeys.length) {
    const alertNotification = new Notification('NEW Appointments Available', {
      body: `NEW! There are appointments available at ${alertKeys.length} NEW locations.`,
    });

    alertNotification.onclick = () => {
      console.log('alert Notification CLICKED!!!!!!');
      shell.openExternal(data[alertKeys[0]].link);
    };

    store.dispatch(newAlerts(data));
  }

  store.dispatch(getLocations(vaxLocations));
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
