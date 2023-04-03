import React from 'react';
import useFileSystemService from './useFileSystemService';

const FileExplorer = () => {
  const {
    breadcrumb,
    fileTree,
    fileContent,
    requestDirectoryAccess,
    listFilesInDirectory,
    openFile,
  } = useFileSystemService();

  return (
    <div className="hud-container">
      <h1 className="hud-heading">File System Access API Test</h1>
      <button className="hud-button" onClick={requestDirectoryAccess}>
        Request Directory Access
      </button>
      <ul className="hud-breadcrumb">
        {breadcrumb.map((item, index) => (
          <li key={index} className="hud-breadcrumb-item" onClick={() => listFilesInDirectory(item)}>
            {item.name}
          </li>
        ))}
      </ul>
      <ul className="hud-file-tree">
        {fileTree.map((item, index) => (
          <li key={index} className="hud-file-tree-item">
            {item.kind === 'directory' ? (
              <>
                <button className="hud-file-tree-button" onClick={() => listFilesInDirectory(item)}>
                  +
                </button>
                <span onClick={() => listFilesInDirectory(item)}>
                  {item.name}
                </span>
              </>
            ) : (
              <a onClick={() => openFile(item)}>{item.name}</a>
            )}
          </li>
        ))}
      </ul>
      <div className="hud-file-content">{fileContent}</div>
    </div>
  );
};

export default FileExplorer;