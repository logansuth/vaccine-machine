const replaceText = (selector, text) => {
  const element = document.getElementById(selector);
  if (element) element.innerText = text;
};

require('electron').ipcRenderer.on('initial', (event, count) => {
  console.log('in event listener (count)————', count);
  new Notification('Vaccines Available', {
    body: `There are vaccine appointments available at ${count} sites.`,
  });

  replaceText(
    'appointments',
    `There are vaccine appointments available at ${count} sites.`
  );
});

require('electron').ipcRenderer.on('update', (event, update) => {
  console.log('in event listener (update)————', update);
  const newCount = Object.keys(update).length;

  new Notification('NEW Vaccines Available', {
    body: `There are vaccine appointments available at ${newCount} new sites.`,
  });

  replaceText(
    'updates',
    `There are NEW vaccine appointments available at ${newCount} sites.`
  );
});
