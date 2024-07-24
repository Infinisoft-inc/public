import { inject } from "@brainstack/inject";
import { createLogger, consoleIntegration, Logger, LogLevel } from "@brainstack/log"; 
import { prepareEnvironment } from "../initialization/prepareEnvironment";
import { OpenAIService } from "../../services/ai/OpenAIService";
import { SupabaseDataService } from "../../services/ai-tools/database/services/SupabaseDataService";
import { IAiService } from "../../services/ai/IAiService";
import { IDataService } from "../../services/data/IDataService";
import { ChatService } from "../../services/chat/ChatService";
import { IChatService } from "../../services/chat/IChatService";
import { SupabaseParserService } from "../../services/ai-tools/database/parsers/SupabaseParserService";
import { ProcessorProvider } from "../../providers/processors/ProcessorProvider";
import { ExitParserService } from "../../services/parsers/ExitParserService";
import { UmlDiagramParserService } from "../../services/ai-tools/database/parsers/UmlDiagramParserService";
import { MicroAppTemplateDataService } from "../../services/ai-tools/microappTemplate/MicroAppTemplateDataService";
import { MicroAppTemplateParserService } from "../../services/ai-tools/microappTemplate/MicroAppTemplateParserService";
import { FSParserService } from "../../services/fs/FSParserService";
import { FSDataService } from "../../services/fs/FSDataService";

export type DIContainer = ReturnType<typeof inject>;

export const prepareDiContainer = (
  loadedEnv: ReturnType<typeof prepareEnvironment>
): DIContainer => {
  const container = inject();

  const dataService = new SupabaseDataService(
    loadedEnv.SUPABASE_CONNEXION_STRING
  );
  const microTemplateService = new MicroAppTemplateDataService(
    "",""
  );

  const aiService = new OpenAIService(
    loadedEnv.AI_PROVIDER_BASE_URL,
    loadedEnv.AI_PROVIDER_API_KEY,
    loadedEnv.AI_MODEL
  );
  
  const userProcessorProvider = new ProcessorProvider([
    new ExitParserService(),
  ]);
  const aiProcessorProvider = new ProcessorProvider([
    new MicroAppTemplateParserService(microTemplateService),
    // new FSParserService()
    // new SupabaseParserService(dataService),
    // new UmlDiagramParserService()
  ]);

  const logService = createLogger(LogLevel.VERBOSE, [consoleIntegration]); 

  const chatService = new ChatService(
    aiService,
    // dataService,
    microTemplateService,
    aiProcessorProvider,
    userProcessorProvider,
    logService
  );

  container.register<IAiService>("aiService", aiService);
  // container.register<IDataService>("dataService", dataService);
  container.register<IChatService>("chatService", chatService);
  container.register<Logger>("logService", logService);
  // container.register<ProcessorProvider>("aiProcessor", aiProcessorProvider);

  return container;
};
