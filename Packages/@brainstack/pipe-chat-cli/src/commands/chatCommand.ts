// chatCommand.ts
import { container } from "..";
import { IChatService } from "../services/chat/IChatService";

export const chatCommand = async (): Promise<void> => {
  const chatService = container.get<IChatService>('chatService')

  await chatService!.chat();
};
