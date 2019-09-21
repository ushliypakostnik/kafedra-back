if (require.main === module) {
  throw 'restricted: called directly from cli';
}

const mm = require('musicmetadata');
const fs = require('fs-extra');
const path = require('path');

function getMP3Info(pathToMp3File) {
  const readableStream = fs.createReadStream(pathToMp3File);

  return new Promise((resolve) => {
    mm(readableStream, { duration: true }, (err, metadata) => {
      if (err) throw err;
      readableStream.close();
      resolve(metadata);
    });
  });
}

function getSongFilesFsPromises(folderAbsPath, folderRelPath, songFiles) {
  return songFiles
    .filter(songFile => songFile.indexOf('mp3') === songFile.length - 3)
    .map(songFile => new Promise((resolveForSongFile) => {
      const fileAbsPath = path.resolve(folderAbsPath, songFile);

      getMP3Info(fileAbsPath).then((results) => {
        // remove surely useless info
        delete results.picture;
        delete results.disk;
        delete results.albumartist;

        resolveForSongFile({
          meta: results,
          url: `${folderRelPath}/${songFile}`,
        });
      }).catch((err) => console.error('something goes wrong', error));
    }));
}

function getFoldersFsPromises(absJSONTargetPath, folders) {
  return folders
    .filter(file => file.isDirectory())
    .map(folder => new Promise((resolveForFolder) => {
      const folderAbsPath = path.resolve(absJSONTargetPath, folder.name);
      const folderRelPath = `/audio/${folder.name}`;

      fs.readdir(folderAbsPath, (error, songFiles) => {
        if (error) throw error;

        Promise.all(
          getSongFilesFsPromises(folderAbsPath, folderRelPath, songFiles)
        ).then(resolveForFolder);
      });
    }));
}

function writeResultsFile(absJSONTargetPath, foldersResults) {
  const plainFoldersResults = foldersResults.reduce((acc, v) => {
    Array.prototype.push.apply(acc, v);
    return acc;
  }, []);
  const data = JSON.stringify({
    songs: plainFoldersResults
  });

  fs.writeFile(`${absJSONTargetPath}/songs.json`, data, (error) => {
    if (error) throw error;
    console.log('The file has been saved!');
  });
}

module.exports = {
  getFoldersFsPromises,
  writeResultsFile
};
