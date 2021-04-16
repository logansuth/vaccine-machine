import React from 'react';
import { shell } from 'electron';

const Title = (props) => {
  return (
    <span id="header" className="flex">
      <h1>Vaccine Machine</h1>
      <h2>
        Data from: &nbsp;
        <span
          className="external-link"
          id="nyc-vaccine"
          onClick={() => shell.openExternal('https://nycvaccinelist.com/')}
        >
          NYC Vaccine List
        </span>
        &nbsp;
      </h2>
    </span>
  );
};

export default Title;
