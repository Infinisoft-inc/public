// ChatService.js

class ChatService {
  static async sendMessage(message) {
    // Simulate sending a message to the server and receiving a response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ sender: "system", content: "Hello, how can I assist you?" });
      }, 1000);
    });
  }
}

export default ChatService;
