const fs = require('fs');
const SaveToFileAction = require('./SaveToFileAction');

class SaveDocumentTask {
  constructor(documentContent, outputFilename) {
    this.documentContent = documentContent;
    this.outputFilename = outputFilename;
  }

  async execute() {
    try {
      const saveToFileAction = new SaveToFileAction(this.documentContent, this.outputFilename);
      await saveToFileAction.execute();
      console.log(`Document saved successfully to ${this.outputFilename}`);
    } catch (error) {
      console.error('Error saving document:', error);
    }
  }
}

module.exports = SaveDocumentTask;
