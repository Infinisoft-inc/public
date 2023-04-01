class SaveTextTaskBrowser {
  constructor(outputFilename) {
    this.outputFilename = outputFilename;
  }
  async run(text) {
    const { saveAs } = require('file-saver');
    try {
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, this.outputFilename);
      console.log(`Text saved successfully to ${this.outputFilename}`);
    } catch (error) {
      console.error('Error saving text:', error);
    }
  }
}
module.exports = SaveTextTaskBrowser;
