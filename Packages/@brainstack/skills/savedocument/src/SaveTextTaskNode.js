class SaveTextTaskNode {
  constructor(outputFilename) {
    this.outputFilename = outputFilename;
  }
  async run(text) {
    const fs = require('fs');
    try {
      fs.writeFileSync(this.outputFilename, text);
      console.log(`Text saved successfully to ${this.outputFilename}`);
    } catch (error) {
      console.error('Error saving text:', error);
    }
  }
}
module.exports = SaveTextTaskNode;
