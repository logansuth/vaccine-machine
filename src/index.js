import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';

import store, { getLocations } from './store';

import { ipcRenderer } from 'electron';

ipcRenderer.send('initial', 'requesting initial data');

ipcRenderer.on('initial', (event, data) => {
  console.log('received data');
  store.dispatch(getLocations(data));
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
