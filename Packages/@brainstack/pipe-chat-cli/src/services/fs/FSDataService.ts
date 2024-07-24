import { writeFileSync } from "fs";
import postgres from "postgres";
import { IDataService } from "../data/IDataService";

export class FSDataService  implements IDataService {

  constructor(private templateRootFolder: string,private projectDevelopmentFolder: string,) {
  }

  async init(): Promise<void> {
    // Any initialization logic
  }

  async getContext(): Promise<string> {
    try {


      // console.log(JSON.stringify(schema));
      // writeFileSync("schema.json", JSON.stringify(schema, null, 2));

      const context =`Sure, here's a prompt that instructs the AI about the commands you provided:

      "You are an assistant working on a software project. I will provide you with commands that you can use to navigate and manage the project files. Here are the commands:
      
      - To read the content of a file, use the \`<READ>\` command followed by the file path. For example, to read the file located at \`./src/app/page.tsx\`, use:
        \`<READ file="./src/app/page.ts content to a file, use the \`<WRITE>\` command followed by the file path and the content to be written. For example, to write content to the file located at \`./README.md\`, use:
        \`\`\`
        <WRITE file="./README.md">
        place content here
        </WRITE>
        \`\`\`
      
      - To create a new folder, use the \`<MKDIR>\` command followed by the parent directory path and the name of the new folder. For example, to create a new folder named \`api\` inside the directory \`./src\`, use:
        \`<MKDIR path="./src" name="api" />\`
      
      - To list all files and folders within a directory, use the \`<LS>\` command followed by the directory path. For example, to list all files and folders within the directory \`./src\`, use:
        \`<LS path="./src" />\`
      
      You can use these commands to navigate and manage the project files efficiently. Please let me know if you have any questions or need assistance with a specific task.`
        

      // console.log("Context length: ", context.length);

      return context;
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  async applyChanges(sqlQuery: string): Promise<void> {
    console.log("Applying changes.. ", sqlQuery);
    // try {
    //   await this.sql.unsafe(sqlQuery);
    //   console.log("Changes applied successfully.");
    // } catch (error) {
    //   console.log(error);
    // }
  }
}


const treeString = `
.
├── [id]
│   └── page.tsx
├── actions
│   ├── create.ts
│   ├── del.ts
│   ├── list.ts
│   ├── read.ts
│   └── update.ts
├── components
│   ├── forms
│   │   ├── CreateForm.tsx
│   │   └── UpdateForm.tsx
│   ├── list
│   │   ├── List.tsx
│   │   └── ListItem.tsx
│   ├── pagination
│   │   ├── PageNumber.tsx
│   │   └── Pagination.tsx
│   ├── search
│   │   └── Search.tsx
│   ├── CreateButton.tsx
│   └── DeleteButton.tsx
├── config
│   └── index.ts
├── create
│   └── page.tsx
├── dto
│   ├── defaults
│   │   ├── defaultInsertOperation.ts
│   │   └── defaultUpdateOperation.ts
│   ├── mappers
│   │   └── abstractions
│   │       └── IMapper.ts
│   └── processors
│       ├── abstractions
│       │   ├── formToMapperGeneric.ts
│       │   └── IDTProcesor.ts
│       ├── entityListToItemList.ts
│       ├── entityToItem.ts
│       ├── formToInsertOperation.ts
│       ├── formToUpdateOperation.ts
│       └── itemToEntity.ts
├── medias
│   ├── AddressIcon.tsx
│   ├── EmailIcon.tsx
│   ├── NameIcon.tsx
│   └── TelephoneIcon.tsx
├── services
│   ├── data
│   │   ├── create.ts
│   │   ├── del.ts
│   │   ├── getById.ts
│   │   ├── index.ts
│   │   ├── list.ts
│   │   └── update.ts
│   └── logger
│       └── index.ts
├── state
│   └── README.md
├── tests
│   └── units
├── types
│   └── index.ts
├── layout.tsx
├── page.tsx
└── README.md
`

const projectTreeString = `.
├── actions
│   └── security
│       ├── fetchLoggedInUserOrganizationId.ts
│       └── fetchUserId..ts
├── app
│   ├── auth
│   │   └── callback
│   │       └── route.ts
│   ├── login
│   │   ├── actions
│   │   │   ├── getByEmail.ts
│   │   │   └── signin.ts
│   │   ├── components
│   │   │   ├── LoginForm.tsx
│   │   │   └── SubmitButton.tsx
│   │   ├── services
│   │   │   └── logger
│   │   │       └── index.ts
│   │   └── page.tsx
│   ├── protected
│   │   ├── acces
│   │   │   ├── [id]
│   │   │   │   └── page.tsx
│   │   │   ├── actions
│   │   │   │   ├── activate.ts
│   │   │   │   ├── create.ts
│   │   │   │   ├── del.ts
│   │   │   │   ├── disable.ts
│   │   │   │   ├── list.ts
│   │   │   │   ├── read.ts
│   │   │   │   └── update.ts
│   │   │   ├── components
│   │   │   │   ├── forms
│   │   │   │   │   └── UpdateForm.tsx
│   │   │   │   ├── list
│   │   │   │   │   ├── List.tsx
│   │   │   │   │   └── ListItem.tsx
│   │   │   │   ├── pagination
│   │   │   │   │   ├── PageNumber.tsx
│   │   │   │   │   └── Pagination.tsx
│   │   │   │   ├── search
│   │   │   │   │   └── Search.tsx
│   │   │   │   ├── CreateButton.tsx
│   │   │   │   ├── DisableButton.tsx
│   │   │   │   └── EnableButton.tsx
│   │   │   ├── config
│   │   │   │   └── index.ts
│   │   │   ├── dto
│   │   │   │   ├── defaults
│   │   │   │   │   ├── defaultInsertOperation.ts
│   │   │   │   │   └── defaultUpdateOperation.ts
│   │   │   │   ├── mappers
│   │   │   │   │   ├── abstractions
│   │   │   │   │   │   └── IMapper.ts
│   │   │   │   │   ├── emailsMapper.ts
│   │   │   │   │   └── phonesMapper.ts
│   │   │   │   └── processors
│   │   │   │       ├── abstractions
│   │   │   │       │   ├── formToMapperGeneric.ts
│   │   │   │       │   └── IDTProcesor.ts
│   │   │   │       ├── entityListToItemList.ts
│   │   │   │       ├── entityToItem.ts
│   │   │   │       ├── formToInsertOperation.ts
│   │   │   │       ├── formToUpdateOperation.ts
│   │   │   │       └── itemToEntity.ts
│   │   │   ├── medias
│   │   │   │   ├── AddressIcon.tsx
│   │   │   │   ├── EmailIcon.tsx
│   │   │   │   ├── NameIcon.tsx
│   │   │   │   └── TelephoneIcon.tsx
│   │   │   ├── services
│   │   │   │   ├── auth
│   │   │   │   │   └── client.ts
│   │   │   │   ├── data
│   │   │   │   │   ├── client.ts
│   │   │   │   │   ├── create.ts
│   │   │   │   │   ├── del.ts
│   │   │   │   │   ├── getById.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── list.ts
│   │   │   │   │   └── update.ts
│   │   │   │   └── logger
│   │   │   │       └── index.ts
│   │   │   ├── types
│   │   │   │   └── index.ts
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── README.md
│   │   ├── approval
│   │   │   ├── actions
│   │   │   │   ├── approve.ts
│   │   │   │   ├── create.ts
│   │   │   │   ├── del.ts
│   │   │   │   ├── list.ts
│   │   │   │   ├── read.ts
│   │   │   │   ├── refuse.ts
│   │   │   │   └── update.ts
│   │   │   ├── components
│   │   │   │   ├── forms
│   │   │   │   │   ├── CreateForm.tsx
│   │   │   │   │   └── UpdateForm.tsx
│   │   │   │   ├── list
│   │   │   │   │   ├── List.tsx
│   │   │   │   │   └── ListItem.tsx
│   │   │   │   ├── pagination
│   │   │   │   │   ├── PageNumber.tsx
│   │   │   │   │   └── Pagination.tsx
│   │   │   │   ├── search
│   │   │   │   │   └── Search.tsx
│   │   │   │   ├── CreateButton.tsx
│   │   │   │   └── DeleteButton.tsx
│   │   │   ├── config
│   │   │   │   └── index.ts
│   │   │   ├── create
│   │   │   │   └── page.tsx
│   │   │   ├── dto
│   │   │   │   ├── defaults
│   │   │   │   │   ├── defaultInsertOperation.ts
│   │   │   │   │   └── defaultUpdateOperation.ts
│   │   │   │   ├── mappers
│   │   │   │   │   └── abstractions
│   │   │   │   │       └── IMapper.ts
│   │   │   │   └── processors
│   │   │   │       ├── abstractions
│   │   │   │       │   ├── formToMapperGeneric.ts
│   │   │   │       │   └── IDTProcesor.ts
│   │   │   │       ├── entityListToItemList.ts
│   │   │   │       ├── entityToItem.ts
│   │   │   │       ├── formToInsertOperation.ts
│   │   │   │       ├── formToUpdateOperation.ts
│   │   │   │       └── itemToEntity.ts
│   │   │   ├── medias
│   │   │   │   ├── AddressIcon.tsx
│   │   │   │   ├── EmailIcon.tsx
│   │   │   │   ├── NameIcon.tsx
│   │   │   │   └── TelephoneIcon.tsx
│   │   │   ├── services
│   │   │   │   ├── data
│   │   │   │   │   ├── create.ts
│   │   │   │   │   ├── del.ts
│   │   │   │   │   ├── getById.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── list.ts
│   │   │   │   │   └── update.ts
│   │   │   │   └── logger
│   │   │   │       └── index.ts
│   │   │   ├── types
│   │   │   │   └── index.ts
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── README.md
│   │   ├── contacts
│   │   │   ├── [id]
│   │   │   │   └── page.tsx
│   │   │   ├── actions
│   │   │   │   ├── create.ts
│   │   │   │   ├── del.ts
│   │   │   │   ├── list.ts
│   │   │   │   ├── read.ts
│   │   │   │   └── update.ts
│   │   │   ├── components
│   │   │   │   ├── forms
│   │   │   │   │   ├── CreateForm.tsx
│   │   │   │   │   └── UpdateForm.tsx
│   │   │   │   ├── list
│   │   │   │   │   ├── List.tsx
│   │   │   │   │   └── ListItem.tsx
│   │   │   │   ├── pagination
│   │   │   │   │   ├── PageNumber.tsx
│   │   │   │   │   └── Pagination.tsx
│   │   │   │   ├── search
│   │   │   │   │   └── Search.tsx
│   │   │   │   ├── CreateButton.tsx
│   │   │   │   └── DeleteButton.tsx
│   │   │   ├── config
│   │   │   │   └── index.ts
│   │   │   ├── create
│   │   │   │   └── page.tsx
│   │   │   ├── dto
│   │   │   │   ├── defaults
│   │   │   │   │   ├── defaultInsertOperation.ts
│   │   │   │   │   └── defaultUpdateOperation.ts
│   │   │   │   ├── mappers
│   │   │   │   │   ├── abstractions
│   │   │   │   │   │   └── IMapper.ts
│   │   │   │   │   ├── emailsMapper.ts
│   │   │   │   │   └── phonesMapper.ts
│   │   │   │   └── processors
│   │   │   │       ├── abstractions
│   │   │   │       │   ├── formToMapperGeneric.ts
│   │   │   │       │   └── IDTProcesor.ts
│   │   │   │       ├── entityListToItemList.ts
│   │   │   │       ├── entityToItem.ts
│   │   │   │       ├── formToInsertOperation.ts
│   │   │   │       ├── formToUpdateOperation.ts
│   │   │   │       └── itemToEntity.ts
│   │   │   ├── medias
│   │   │   │   ├── AddressIcon.tsx
│   │   │   │   ├── EmailIcon.tsx
│   │   │   │   ├── NameIcon.tsx
│   │   │   │   └── TelephoneIcon.tsx
│   │   │   ├── services
│   │   │   │   ├── data
│   │   │   │   │   ├── client.ts
│   │   │   │   │   ├── create.ts
│   │   │   │   │   ├── del.ts
│   │   │   │   │   ├── getById.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── list.ts
│   │   │   │   │   └── update.ts
│   │   │   │   └── logger
│   │   │   │       └── index.ts
│   │   │   ├── state
│   │   │   │   └── README.md
│   │   │   ├── tests
│   │   │   │   └── units
│   │   │   ├── types
│   │   │   │   └── index.ts
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── README.md
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── status
│   │   ├── approved
│   │   │   └── page.tsx
│   │   ├── disabled
│   │   │   └── page.tsx
│   │   ├── pending
│   │   │   └── page.tsx
│   │   └── refused
│   │       └── page.tsx
│   ├── subscribe
│   │   ├── actions
│   │   │   ├── createProfile.ts
│   │   │   ├── listOrg.ts
│   │   │   ├── signup.ts
│   │   │   └── subscribe.ts
│   │   ├── components
│   │   │   └── SubscribeForm.tsx
│   │   ├── config
│   │   │   └── index.ts
│   │   ├── services
│   │   │   ├── data
│   │   │   │   ├── create.ts
│   │   │   │   ├── getById.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── list.ts
│   │   │   │   └── update.ts
│   │   │   └── logger
│   │   │       └── index.ts
│   │   ├── types
│   │   │   └── index.ts
│   │   ├── page.tsx
│   │   ├── README.md
│   │   └── submit-button.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── CardsNavigation
│   │   ├── Card.tsx
│   │   ├── CardsGridContainer.tsx
│   │   └── index.tsx
│   ├── AuthButton.tsx
│   ├── BackButton.tsx
│   ├── FeedbackMessage.tsx
│   ├── HomeButton.tsx
│   └── OptionList.tsx
└── i18n.ts`