const fs = require('fs');
const Config = require('./../config/Configs');

/**
 * 
 */
exports.writeToFile = function(fileName, jsonResponse) {
  fs.writeFile(`${Config.downloadPath}${fileName}`, JSON.stringify(jsonResponse), (err) => {
    if (err) throw err;
    console.log('File Saved at! ' + new Date);
  });
};
