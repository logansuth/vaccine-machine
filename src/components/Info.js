import React from 'react';

const Info = (props) => {
  return (
    <ul id="info">
      <li>
        When this app loads, it finds all available appointments listed on NYC
        Vaccine List, via a webscraper. To learn more about how NYC Vaccine List
        collects its data, click on the link above.
      </li>
      <li>
        After the inital load, it updates every 60 seconds with fresh data, as
        long as this window is kept open or minimized.
      </li>
      <li>
        If new vaccine locations have appointments (ones not already listed
        below), you will recieve a notification (via your mac or pc's
        notification system), and those locations will be highlighted in pink at
        the top of the list.
      </li>
      <li>
        Click any location's name or the notification to be taken to a website
        to sign up. Be aware that these links are not always correct. We do our
        best to match them appropriately.
      </li>
    </ul>
  );
};

export default Info;
