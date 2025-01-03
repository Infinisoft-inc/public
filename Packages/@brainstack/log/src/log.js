const fs = require('fs');
const path = require('path');

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${message}
`;
  fs.appendFile(path.join(__dirname, 'log.txt'), logMessage, (err) => {
    if (err) throw err;
  });
}

module.exports = log;
