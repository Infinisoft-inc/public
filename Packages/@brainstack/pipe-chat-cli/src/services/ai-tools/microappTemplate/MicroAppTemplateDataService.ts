import { writeFileSync } from "fs";
import postgres from "postgres";
import { IDataService } from "../../data/IDataService";

export class MicroAppTemplateDataService implements IDataService {

  constructor(private templateRootFolder: string,private projectDevelopmentFolder: string,) {
  }

  async init(): Promise<void> {
    // Any initialization logic
  }

  async getContext(): Promise<string> {
    try {


      // console.log(JSON.stringify(schema));
      // writeFileSync("schema.json", JSON.stringify(schema, null, 2));

      const context =
        "We are developing a software project and you contribute as an AI expert in the team."+
        "I had a idea to create a microapp template very small constructed by design patterns. From there we can use the template combined with it self forming more complex pattern to solve real worl data problems.\m"+
        "Current project files is a composition of microapp template: "+
        projectTreeString +
        "\n\n"+
        "Refer to the following microapp template files and folder strucure if required to answer: \n\n" +
        "Microapp template files: \n" +
        treeString +
        "\n\n"
        // "If the user requests to generate executable sql, you place the entire code inside <EXECUTE_QUERY> Place generated SQL code inside the tags. </EXECUTE_QUERY>. I am expecting only 1 <EXECUTE_SQL> code block containing the entire compete query for Supabase.";

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