type Message = {
  senderId: string;
  content: string;
  timestamp: Date;
};

type PrivateMessage = Message & {
  recipientId: string;
};

class MinimalistChatServer {
  private users: Map<string, string>; // Map userId to nickname
  private generalChannelMessages: Message[];
  private privateMessages: PrivateMessage[];

  constructor() {
    this.users = new Map();
    this.generalChannelMessages = [];
    this.privateMessages = [];
  }

  registerUser(userId: string, nickname: string): void {
    this.users.set(userId, nickname);
  }

  sendBroadcastMessage(senderId: string, content: string): void {
    const message: Message = {
      senderId,
      content,
      timestamp: new Date(),
    };
    this.generalChannelMessages.push(message);
  }

  sendPrivateMessage(senderId: string, recipientId: string, content: string): void {
    const message: PrivateMessage = {
      senderId,
      recipientId,
      content,
      timestamp: new Date(),
    };
    this.privateMessages.push(message);
  }

  listUsers(): string[] {
    return Array.from(this.users.values());
  }

  getMessagesInGeneralChannel(): Message[] {
    return this.generalChannelMessages;
  }

  getPrivateMessagesForUser(userId: string): PrivateMessage[] {
    return this.privateMessages.filter((message) => message.recipientId === userId);
  }
}

// Usage:
const chatServer = new MinimalistChatServer();
chatServer.registerUser('1', 'Alice');
chatServer.registerUser('2', 'Bob');

// Broadcasting a message to the general channel
chatServer.sendBroadcastMessage('1', 'Hello everyone! This is Alice.');

// Sending a private message to Bob
chatServer.sendPrivateMessage('1', '2', 'Hi Bob, this is a private message.');

// Listing all users
console.log(chatServer.listUsers());

// Getting all messages from the general channel
console.log(chatServer.getMessagesInGeneralChannel());

// Getting private messages for Bob
console.log(chatServer.getPrivateMessagesForUser('2'));