// useFileSystemService.js
import { useState, useEffect } from 'react';
import fileService from './fileService';

const useFileSystemService = () => {
  const [currentDirectoryHandle, setCurrentDirectoryHandle] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [fileTree, setFileTree] = useState([]);
  const [fileContent, setFileContent] = useState('');

  const requestDirectoryAccess = async () => {
    const directoryHandle = await fileService.requestDirectoryAccess();
    setCurrentDirectoryHandle(directoryHandle);
    setBreadcrumb([directoryHandle]);
  };

  const listFilesInDirectory = async (directoryHandle) => {
    const { directories, files } = await fileService.listFilesInDirectory(directoryHandle);
    setFileTree([...directories, ...files]);
  };

  const openFile = async (fileHandle) => {
    const content = await fileService.openFile(fileHandle);
    setFileContent(content);
  };

  // Update file tree whenever the current directory handle changes
  useEffect(() => {
    listFilesInDirectory(currentDirectoryHandle);
  }, [currentDirectoryHandle]);

  return {
    currentDirectoryHandle,
    breadcrumb,
    fileTree,
    fileContent,
    requestDirectoryAccess,
    listFilesInDirectory,
    openFile,
  };
};

export default useFileSystemService;
