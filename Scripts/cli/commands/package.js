// commands/package.js

const createPackage = require("./package/createPackage");
const deletePackage = require("./package/deletePackage");

exports.execute = function(args) {
    const option = args[0];
  
    if (option === '-c') {
      console.log('Creating package...');
      createPackage()
    } else if (option === '-d') {
      console.log('Deleting package...');
      deletePackage()
    } else {
      console.error('Invalid option for package command.');
      console.log('Usage: package -c | -d');
    }
  };
  
  exports.name = 'package';
  exports.description = 'Create or delete a package';
  exports.options = ['-c', '-d'];