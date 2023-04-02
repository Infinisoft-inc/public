# Brainstack Text Document Saver Task

The `brainstack-text-document-saver` package provides a Brainstack task for saving text to a file in both Node.js and browser environments. The package includes two tasks, `SaveTextTaskNode` and `SaveTextTaskBrowser`, which can be used within a Brainstack skill to save text to a file.

## Usage

To use the `SaveTextTaskNode` or `SaveTextTaskBrowser` task within a Brainstack skill, you need to create an instance of the task, specifying the output filename, and execute the task with the text you want to save. Below are examples of how to use these tasks in both Node.js and browser environments.

### Node.js

Here's an example of how to use the `SaveTextTaskNode` task within a Brainstack skill in a Node.js environment:

```javascript
const { Skill, Task } = require('@brainstack/framework');
const SaveTextTaskNode = require('./SaveTextTaskNode');

class SaveTextSkill extends Skill {
  constructor(outputFilename) {
    super();
    this.addTask(new SaveTextTaskNode(outputFilename));
  }
}

// Create an instance of the skill, specifying the output filename
const saveTextSkill = new SaveTextSkill('output.txt');

// Execute the skill with the text to save
saveTextSkill.execute('Hello, this is a test for Node.js!').catch(console.error);
```

### Browser

Here's an example of how to use the `SaveTextTaskBrowser` task within a Brainstack skill in a browser environment:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Test SaveTextTaskBrowser</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
  <script src="./Skill.js"></script> <!-- Import the Brainstack Skill -->
  <script src="./SaveTextTaskBrowser.js"></script>
</head>
<body>
  <button onclick="testSaveTextTaskBrowser()">Save Text</button>
  <script>
    class SaveTextSkill extends Skill {
      constructor(outputFilename) {
        super();
        this.addTask(new SaveTextTaskBrowser(outputFilename));
      }
    }
// Function to test SaveTextTaskBrowser
function testSaveTextTaskBrowser() {
  // Create an instance of the skill, specifying the output filename
  const saveTextSkill = new SaveTextSkill('output.txt');

  // Execute the skill with the text to save
  saveTextSkill.execute('Hello, this is a test for the browser!');
}
  </script>
</body>
</html>
```
## Testing
To test both tasks, you can create and run separate test scripts for Node.js and browser environments. Follow the examples provided in the Usage section to create the test scripts.

Run the Node.js test script using Node.js from the command line:
```bash
node testNode.js
```
Verify that a file named output.txt was created with the specified content.

Serve the browser test script with an HTTP server and open it in a web browser:

```bash
npx http-server . -o testBrowser.html
```
Click the "Save Text" button to test the SaveTextTaskBrowser task in the browser. The browser should prompt you to download a file named output.txt with the specified content.

## Build
The brainstack-text-document-saver package does not require a build process for Node.js usage. However, if you need to bundle the package for use in a browser environment, you can use a module bundler like Webpack or Rollup.

## License

MIT

## Contributing

Contributions to the `brainstack-text-document-saver` package are welcome. Feel free to submit pull requests or open issues on the project's GitHub repository.

## About Brainstack

Brainstack is a powerful AI framework that allows you to build intelligent assistants and chatbots with modular skills and tasks. It provides a way to orchestrate various tasks to achieve a specific goal, allowing developers to create and reuse tasks in different skills.

## Disclaimer

Please note that this package is a demonstration and may not be suitable for use in production environments without further testing and modification. It is important to handle file saving and user input securely to prevent security vulnerabilities.

## Acknowledgments

- The browser implementation of saving text files uses the [FileSaver.js](https://github.com/eligrey/FileSaver.js) library.
