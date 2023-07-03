// Example usage in the browser
        (async () => {
        const browserAdapter = new BrowserIntegrationAdapter();
        
        // Create
        const id = await browserAdapter.create({ name: 'John Doe' });
        
        // Read
        const data = await browserAdapter.read(id);
        console.log(data); // Output: { name: 'John Doe' }
        
        // Update
        await browserAdapter.update(id, { name: 'Jane Doe' });
        const updatedData = await browserAdapter.read(id);
        console.log(updatedData); // Output: { name: 'Jane Doe' }
        
        // Delete
        await browserAdapter.delete(id);
        const deletedData = await browserAdapter.read(id);
        console.log(deletedData); // Output: null
        })();
  

  

// Example usage in a Node.js environment
(async () => {
  const nodeAdapter = new NodeIntegrationAdapter('./data');

  // Create
  const id = await nodeAdapter.create({ name: 'John Doe' });

  // Read
  const data = await nodeAdapter.read(id);
  console.log(data); // Output: { name: 'John Doe' }

  // Update
  await nodeAdapter.update(id, { name: 'Jane Doe' });
  const updatedData = await nodeAdapter.read(id);
  console.log(updatedData); // Output: { name: 'Jane Doe' }

  // Delete
  await nodeAdapter.delete(id);
  const deletedData = await nodeAdapter.read(id);
  console.log(deletedData); // Output: null

  // List
  const fileList = await nodeAdapter.list();
  console.log(fileList); // Output: array of file IDs
})();


/ Example usage
(async () => {
  const adapter = new FileSystemIntegrationAdapter();

  // List files in the directory
  const files = await adapter.list();
  console.log(files);

  // Create a file
  await adapter.create('example.txt', 'Hello, World!');

  // List files in the directory after creating a file
  const updatedFiles = await adapter.list();
  console.log(updatedFiles);

  // Read the content of the created file
  const fileContent = await adapter.read('example.txt');
  console.log(fileContent);

  // Update the content of the created file
  await adapter.update('example.txt', 'Updated content.');

  // Delete the created file
  await adapter.delete('example.txt');

  // List files in the directory after deleting a file
  const finalFiles = await adapter.list();
  console.log(finalFiles);
})();