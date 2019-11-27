const fs = require('fs');

/**
 * 
 */
exports.writeToFile = function(jsonResponse) {
  fs.writeFile('Downloads/pod-info.json', JSON.stringify(jsonResponse), (err) => {
    if (err) throw err;
    console.log('File Saved at! ' + new Date);
  });
};
