import fs from "fs";
import * as pathModule from "path";
import { ChatCompletionTool } from "openai/resources";

export type ExecuteFunction = (...args: any[]) => Promise<any>;
export type Tools = Record<string, Tool>;
export type Property = { type: string; description: string };
export type Properties = Record<string, Property>;

export interface Tool {
  definition: ChatCompletionTool;
  execute: ExecuteFunction;
}

export const createTool = (
  name: string,
  description: string,
  required: string[],
  properties: Properties,
  executeFn: ExecuteFunction
): Tool => {
  const toolDefinition: ChatCompletionTool = {
    type: "function",
    function: {
      name,
      description,
      parameters: {
        type: "object",
        properties,
        required,
      },
    },
  };

  return {
    definition: toolDefinition,
    execute: executeFn,
  };
};

const toolDefinitions = [
  {
    name: "listDirectories",
    description: "List all subdirectories in a given directory path",
    parameters: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "The directory path to list subdirectories from",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "listFiles",
    description: "List all files in a given directory path",
    parameters: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "The directory path to list files from",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "getMetadata",
    description: "Get metadata of a file or directory",
    parameters: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "The file or directory path to retrieve metadata from",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "readFile",
    description: "Read the contents of a file",
    parameters: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "The file path to read from",
        },
        encoding: {
          type: "string",
          enum: ["utf-8", "utf-16", "ascii"],
          default: "utf-8",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "writeFile",
    description: "Write the contents of a file",
    parameters: {
      type: "object",
      properties: {
        path: { type: "string", description: "The file path to write" },
        content: {
          type: "string",
          description: "The content to write",
        },
        encoding: {
          type: "string",
          enum: ["utf-8", "utf-16", "ascii"],
          default: "utf-8",
        },
      },
      required: ["path", "content"],
    },
  },
  {
    name: "traverseDirectory",
    description:
      "Recursively list all files and directories within a given path",
    parameters: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "The root directory path to begin traversal from",
        },
      },
      required: ["path"],
    },
  },
];

const toolImplementations = {
  listDirectories: (args: string) => {
    try {
      const { path } = JSON.parse(args);
      const entries = fs.readdirSync(path, { withFileTypes: true });
      const directories = entries
        .filter((entry) => entry.isDirectory())
        .map((dir) => dir.name);
      return directories.join("\n");
    } catch (error: any) {
      return `I have not beein able to list folders. I get that error message: ${error?.message}`;
    }
  },
  listFiles: (args: string) => {
    try {
      const { path } = JSON.parse(args);
      const entries = fs.readdirSync(path, { withFileTypes: true });
      const files = entries
        .filter((entry) => entry.isFile())
        .map((file) => file.name);
      return `Here is the file list at ${path}: ${files.join("\n")}`;
    } catch (error: any) {
      return `I have not beein able to list files. I get that error message: ${error?.message}`;
    }
  },
  getMetadata: (args: string) => {
    try {
      const { path } = JSON.parse(args);
      const stats = fs.statSync(path);
      return `Here is the meta data I found for file ${path} ${JSON.stringify(
        stats,
        null,
        2
      )}`;
    } catch (error: any) {
      return `I have not beein able to get metadata. I get that error message: ${error?.message}`;
    }
  },
  readFile: (args: string) => {
    try {
      const { path } = JSON.parse(args);
      const data = fs.readFileSync(path, { encoding: "utf8" });
      return `I have read the file at ${path} successfully. Here is the content: ${data}`;
    } catch (error: any) {
      return `I have not beein able to read the file. I get that error message: ${error?.message}`;
    }
  },
  writeFile: (args: string) => {
    try {
      const { path, content } = JSON.parse(args);
      fs.writeFileSync(path, content, { encoding: "utf8" });
      return `I have written file at ${path} successfully.`;
    } catch (error: any) {
      return `I have not beein able to write file. I get that error message: ${error?.message}`;
    }
  },
  traverseDirectory: (args: string): string => {
    try {
      const { path, currentPath = "." } = JSON.parse(args);
      const fullPath = pathModule.join(path, currentPath);
      const entries = fs.readdirSync(fullPath, { withFileTypes: true });
      let allPaths: string[] = [];

      for (const entry of entries) {
        const entryFullPath = pathModule.join(currentPath, entry.name);
        if (entry.isDirectory()) {
          allPaths = allPaths.concat(
            toolImplementations
              .traverseDirectory(
                JSON.stringify({ path, currentPath: entryFullPath })
              )
              .split("\n") // Split the result to get an array
          );
        } else {
          allPaths.push(entryFullPath);
        }
      }

      return allPaths.join("\n");
    } catch (error: any) {
      return `I have not been able to traverse files recursively in the folder. I get this error message: ${error.message}`;
    }
  },
};

export const createAllTools = (
  toolDefinitions: any[],
  implementations: any
) => {
  const tools: Tools = {};
  toolDefinitions.forEach((def) => {
    const { name, description, parameters } = def;
    tools[name] = createTool(
      name,
      description,
      parameters.required,
      parameters.properties,
      implementations[name]
    );
  });
  return tools;
};

const tools = createAllTools(toolDefinitions, toolImplementations);
export default tools;
