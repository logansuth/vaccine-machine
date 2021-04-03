import React from 'react';

import '../assets/css/App.css';

import Homepage from '../components/HomePage';

import { ipcRenderer } from 'electron';

function App() {
  return (
    <div>
      <Homepage />
    </div>
  );
}

export default App;
