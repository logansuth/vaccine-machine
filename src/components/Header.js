import React from 'react';

const Header = () => {
  console.log('window———————', window);
  console.log('ipcRenderer——————', window.ipcRenderer);
  return (
    <div>
      <h1>Vaccine Machine</h1>
      <div id="appointments">
        There are appointments at FILL THIS IN locations.
      </div>
    </div>
  );
};

export default Header;
