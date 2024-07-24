import fs from 'fs';
import path from 'path';

// Lists all subdirectories within a specified directory path
export function listDirectories(directoryPath) {
    const entries = fs.readdirSync(directoryPath, { withFileTypes: true });
    const directories = entries
        .filter(entry => entry.isDirectory())
        .map(dir => dir.name);
    return directories;
}

// Lists all files within a specified directory path
export function listFiles(directoryPath) {
    const entries = fs.readdirSync(directoryPath, { withFileTypes: true });
    const files = entries
        .filter(entry => entry.isFile())
        .map(file => file.name);
    return files;
}

// Retrieves metadata for a specified file or directory path
export function getMetadata(filePath) {
    const stats = fs.statSync(filePath);
    return stats;
}

// Reads the contents of a specified file
export function readFile(filePath, fileEncoding = 'utf-8') {
    const data = fs.readFileSync(filePath, fileEncoding);
    return data;
}


// Write the contents of a specified file
export function writeFile(filePath, content, fileEncoding = 'utf-8') {
    try {
        fs.writeFileSync(filePath, content, fileEncoding);
        return { success: true, message: 'File written successfully' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Recursively traverses a directory and lists all directories and files within
export function traverseDirectory(directoryPath, currentPath = '') {
    const fullPath = path.join(directoryPath, currentPath);
    const entries = fs.readdirSync(fullPath, { withFileTypes: true });
    let allPaths = [];

    for (const entry of entries) {
        const entryFullPath = path.join(currentPath, entry.name);
        if (entry.isDirectory()) {
            allPaths = allPaths.concat(traverseDirectory(directoryPath, entryFullPath));
        } else {
            allPaths.push(entryFullPath);
        }
    }

    return allPaths;
}