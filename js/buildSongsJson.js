import fs from 'fs-extra';

import config from '../config';

import {
  getFoldersFsPromises,
  writeResultsFile,
} from './_helpers';

fs.readdir(config.TARGET_PATH, {
  withFileTypes: true,
}, (err, folders) => {
  if (err) throw err;

  Promise.all(
    getFoldersFsPromises(config.TARGET_PATH, folders),
  ).then(foldersResults => writeResultsFile(config.TARGET_PATH, foldersResults));
});
