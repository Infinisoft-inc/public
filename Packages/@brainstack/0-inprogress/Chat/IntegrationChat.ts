import { coreServices } from '../Brainstack';
import { Message } from '../../standby/message-models'; // Import your defined message types

class ChatServerWithHub {
    private hub = coreServices.hub

    constructor() {
        // Subscribe to chat-related events
        this.hub.on('message.broadcast', this.handleBroadcastMessage.bind(this));
        this.hub.on('message.private', this.handlePrivateMessage.bind(this));

        // Additional subscriptions or initial setup as required...
    }

    // Example method for handling incoming broadcast messages 
    private handleBroadcastMessage(message: Message): void {
        // Do something with the broadcast message...
        console.log(`Broadcast message received: ${message.content}`);

        // Logic to broadcast to all users would go here
    }

    // Example method for handling private messages
    private handlePrivateMessage(message: Message & { recipientId: string }): void {
        // Do something with the private message...
        console.log(`Private message to ${message.recipientId}: ${message.content}`);

        // Logic to send a message to the specified recipient would go here
    }

    // Example method for broadcasting messages to all users
    public broadcastMessageToAll(content: string): void {
        const broadcastMsg: Message = { senderId: 'system', content, timestamp: new Date() };
        this.hub.emit('message.broadcast', broadcastMsg);
    }

    // Example method for sending a private message
    public sendPrivateMessageToUser(recipientId: string, content: string): void {
        const privateMsg: Message = { senderId: 'system', recipientId, content, timestamp: new Date() };
        this.hub.emit('message.private', privateMsg);
    }
}

// Usage example:
const chatServer = new ChatServerWithHub();
chatServer.broadcastMessageToAll('Welcome to the Brain Stack Chat!');
chatServer.sendPrivateMessageToUser('Alice', 'Hi Alice, this is a private message.');