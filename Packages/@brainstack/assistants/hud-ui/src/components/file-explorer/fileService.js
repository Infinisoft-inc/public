// fileService.js
const fileService = {
    requestDirectoryAccess: async () => {
      const directoryHandle = await window.showDirectoryPicker();
      return directoryHandle;
    },
    listFilesInDirectory: async (directoryHandle) => {
      const directories = [];
      const files = [];
      for await (const entry of directoryHandle.values()) {
        if (entry.kind === 'directory') {
          directories.push(entry);
        } else if (entry.kind === 'file') {
          files.push(entry);
        }
      }
      return { directories, files };
    },
    openFile: async (fileHandle) => {
      const file = await fileHandle.getFile();
      const fileContent = await file.text();
      return fileContent;
    },
  };
  
  export default fileService;
  