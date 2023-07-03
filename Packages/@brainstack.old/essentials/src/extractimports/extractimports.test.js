import fs from 'fs';
import path from 'path';
import { extractImportsAndReadFiles } from './extractimports.js';

jest.mock('fs');

describe('extractImportsAndReadFiles', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should extract local imports and read files up to 3 levels of nesting', () => {
    const fileContent1 = `
      import { func1 } from './file2.js';
      import { func2 } from './file3.js';
    `;

    const fileContent2 = `
      import { func3 } from './file4.js';
    `;

    const fileContent3 = `
      // File 3 content
    `;

    fs.readFileSync
      .mockReturnValueOnce(fileContent1)
      .mockReturnValueOnce(fileContent2)
      .mockReturnValueOnce(fileContent3);

    const expectedResult = `
      // Filename: file1.js
      ${fileContent1}
      
      // Filename: file2.js
      ${fileContent2}
      
      // Filename: file3.js
      ${fileContent3}
    `;

    const result = extractImportsAndReadFiles('file1.js');

    expect(result).toEqual(expectedResult);
    expect(fs.readFileSync).toHaveBeenCalledTimes(3);
    expect(fs.readFileSync).toHaveBeenNthCalledWith(1, path.resolve('file1.js'), 'utf-8');
    expect(fs.readFileSync).toHaveBeenNthCalledWith(2, path.resolve('file2.js'), 'utf-8');
    expect(fs.readFileSync).toHaveBeenNthCalledWith(3, path.resolve('file3.js'), 'utf-8');
  });

  it('should exclude specified files from processing', () => {
    const fileContent = `
      import { func1 } from './file2.js';
    `;

    fs.readFileSync.mockReturnValueOnce(fileContent);

    const expectedResult = '';

    const result = extractImportsAndReadFiles('file1.js');

    expect(result).toEqual(expectedResult);
    expect(fs.readFileSync).toHaveBeenCalledTimes(1);
    expect(fs.readFileSync).toHaveBeenCalledWith(path.resolve('file1.js'), 'utf-8');
  });
});
