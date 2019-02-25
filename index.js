const ExifImage = require('exif').ExifImage;
const fs = require('fs');
const path = require('path');
const moment = require('moment');

if (process.argv.length === 2)
  return console.log("Usage: node ./index.js [directory-of-photos]");

const DIRECTORY = process.argv[2];

fs.readdirSync(DIRECTORY)
    .map(filename => `${DIRECTORY}/${filename}`)
    .filter(filename => fs.statSync(filename).isFile())
    .filter(filename => filename.indexOf(".DS_Store") === -1)
    .forEach(filename => renameFile(filename));

function renameFile(filePath) {
  new ExifImage({ image : filePath }, (err, exifData) => {
    if (err) {
      console.error("Problem with file: " + filePath);
      throw err;
    }

    const creationDate = moment(exifData.exif.CreateDate, "YYYY:MM:DD HH:mm:ss");

    const dirPath = path.dirname(filePath);
    const filename = path.basename(filePath, path.extname(filePath));

    const split = filename.split("_");
    const num = split[split.length - 1];

    const newFilename = `${creationDate.format('YYYY_MM_DD')}_${num}.jpg`;
    if (newFilename !== filename + ".jpg") {
      console.log(`Renaming ${filename} to ${newFilename}`);
      fs.renameSync(filePath, dirPath + "/" + newFilename); 
    }
    else {
      console.log(`No change needed for ${newFilename}`);
    }
  });
}
