require('dotenv').config();
const { notarize } = require('electron-notarize');

const appBundleId = 'com.electron.vaccine-machine';
const appleId = process.env.APPLEID;
const appleIdPassword = process.env.APPLEIDPASSWORD;

console.log('APPLE ID———', process.env.APPLEID);
console.log('APPLE ID PASS———', process.env.APPLEIDPASSWORD);

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== 'darwin') {
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  return await notarize({
    appBundleId,
    appPath: `${appOutDir}/${appName}.app`,
    appleId,
    appleIdPassword,
  });
};
