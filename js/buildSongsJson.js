const fs = require('fs-extra');
const path = require('path');

const { getFoldersFsPromises, writeResultsFile } = require('./_helpers');

const absJSONTargetPath = path.resolve(__dirname, '..', 'audio');

fs.readdir(absJSONTargetPath, {
  withFileTypes: true,
}, (err, folders) => {
  if (err) throw err;

  Promise.all(
    getFoldersFsPromises(absJSONTargetPath, folders)
  ).then(foldersResults => writeResultsFile(absJSONTargetPath, foldersResults));
});
