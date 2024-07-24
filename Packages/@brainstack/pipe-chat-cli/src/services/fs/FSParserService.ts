import fs from 'fs/promises';
import { promptUser } from "../../utils/promptUser";
import { IParserService } from "../parsers/IParserService";

export class FSParserService implements IParserService {
  private commandPatterns = {
    read: /<READ\s+file="([^"]+)"\s*\/>/,
    write: /<WRITE\s+file="([^"]+)"\s*>([\s\S]*)<\/WRITE>/,
    mkdir: /<MKDIR\s+path="([^"]+)"\s+name="([^"]+)"\s*\/>/,
    ls: /<LS\s+path="([^"]+)"\s*\/>/
  };

  shouldRun(message: string): boolean {
    const r = Object.values(this.commandPatterns).some(pattern => pattern.test(message));

    console.log(`
      
      SHOULD RUN ? ${r}can o uread 
      
      `)

    return r
  }

  async run(message: string): Promise<void | string> {
    if (!this.shouldRun(message)) {
      return "Invalid command.";
    }

    const readMatch = message.match(this.commandPatterns.read);
    if (readMatch) {
      const [, filePath] = readMatch;
      return await this.readFile(filePath);
    }

    const writeMatch = message.match(this.commandPatterns.write);
    if (writeMatch) {
      const [, filePath, content] = writeMatch;
      return await this.writeFile(filePath, content);
    }

    const mkdirMatch = message.match(this.commandPatterns.mkdir);
    if (mkdirMatch) {
      const [, parentPath, folderName] = mkdirMatch;
      return await this.createFolder(parentPath, folderName);
    }

    const lsMatch = message.match(this.commandPatterns.ls);
    if (lsMatch) {
      const [, directoryPath] = lsMatch;
      return await this.listDirectory(directoryPath);
    }

    return "Invalid command.";
  }

  private async readFile(filePath: string): Promise<string> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return content;
    } catch (error:any) {
      return `Error reading file: ${error?.message}`;
    }
  }

  private async writeFile(filePath: string, content: string): Promise<string> {
    const confirmation = await promptUser(
      `Do you want to write the following content to the file ${filePath}? (yes/no):\n${content}`
    );
    if (confirmation.toLowerCase() === "yes") {
      try {
        await fs.writeFile(filePath, content);
        return `Content written successfully to file ${filePath}.`;
      } catch (error:any) {
        return `Error writing to file: ${error?.message}`;
      }
    }
    return "User refused to write the content to the file.";
  }

  private async createFolder(parentPath: string, folderName: string): Promise<string> {
    const confirmation = await promptUser(
      `Do you want to create a new folder named ${folderName} inside the directory ${parentPath}? (yes/no)`
    );
    if (confirmation.toLowerCase() === "yes") {
      try {
        await fs.mkdir(`${parentPath}/${folderName}`);
        return `Folder ${folderName} created successfully inside the directory ${parentPath}.`;
      } catch (error:any) {
        return `Error creating folder: ${error?.message}`;
      }
    }
    return "User refused to create the new folder.";
  }

  private async listDirectory(directoryPath: string): Promise<string> {
    try {
      const files = await fs.readdir(directoryPath);
      return `Files and folders in the directory ${directoryPath}:\n${files.join("\n")}`;
    } catch (error:any) {
      return `Error listing directory: ${error?.message}`;
    }
  }
}




// import { promptUser } from "../../utils/promptUser";
// import { IDataService } from "../data/IDataService";
// import { IParserService } from "../parsers/IParserService";


// export class FSParserService implements IParserService {
//   constructor(private dataService: IDataService) {}

//   shouldRun(message: string): boolean {
//     return false;
//     // return /<EXECUTE_QUERY>[\s\S]*<\/EXECUTE_QUERY>/.test(message);
//   }

//   async run(message: string): Promise<void | string> {
//     const instructions = message.match(
//       /<EXECUTE_QUERY>([\s\S]*)<\/EXECUTE_QUERY>/
//     )?.[1];

//     if (this.shouldRun(message) && instructions) {
//       const result = await this.action(instructions);
//       return result;
//     }
//   }

//   private async action(content: string) {
//     const confirmation = promptUser(
//       `Do you want to apply these changes: ${content}? (yes/no): `
//     );
//     if (confirmation.toLowerCase() === "yes") {
//       await this.dataService.applyChanges(content);
//       return "Supabase query executed successfully. query was: " + content;
//     }

//     return "User refused to run the database query. Simply aknowledge politely.";
//   }
// }
