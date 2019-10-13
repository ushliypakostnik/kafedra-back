import * as mm from 'music-metadata';
import fs from 'fs-extra';
import path from 'path';

import config from '../config';

if (require.main === module) {
  throw 'restricted: called directly from cli'; // eslint-disable-line no-throw-literal
}

// eslint-disable-next-line arrow-body-style
const getSongFilesFsPromises = (folderAbsPath, folderRelPath, songFiles) => {
  return songFiles
    .filter(songFile => songFile.indexOf('mp3') === songFile.length - 3)
    .map(songFile => new Promise((resolveForSongFile) => {
      const fileAbsPath = path.resolve(folderAbsPath, songFile);

      mm.parseFile(fileAbsPath, { duration: true }).then(metadata => {

        resolveForSongFile({
          title: metadata.common.title,
          url: `${config.HOST}${folderRelPath}/${songFile}`,
          duration: metadata.format.duration,
        });
      }).catch((err) => console.error('something goes wrong', err)); // eslint-disable-line arrow-parens
    }));
};

// eslint-disable-next-line arrow-body-style
export const getFoldersFsPromises = (absJSONTargetPath, folders) => {
  return folders
    .filter(file => file.isDirectory())
    .map(folder => new Promise((resolveForFolder) => {
      const folderAbsPath = path.resolve(absJSONTargetPath, folder.name);
      const folderRelPath = `/audio/${folder.name}`;

      fs.readdir(folderAbsPath, (error, songFiles) => {
        if (error) throw error;

        Promise.all(
          getSongFilesFsPromises(folderAbsPath, folderRelPath, songFiles),
        ).then(resolveForFolder);
      });
    }));
};

export const writeResultsFile = (absJSONTargetPath, foldersResults) => {
  const plainFoldersResults = foldersResults.reduce((acc, v) => {
    Array.prototype.push.apply(acc, v);
    return acc;
  }, []);
  const data = JSON.stringify(plainFoldersResults);

  fs.writeFile(`${absJSONTargetPath}/${config.TARGET}`, data, (error) => {
    if (error) throw error;
    console.log('The file has been saved!');
  });
};
