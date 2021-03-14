import React from 'react';

import '../assets/css/App.css';

import Homepage from '../components/HomePage';

import { ipcRenderer } from 'electron';

function App() {
  console.log(ipcRenderer);
  return (
    <div>
      <Homepage />
    </div>
  );
}

export default App;
