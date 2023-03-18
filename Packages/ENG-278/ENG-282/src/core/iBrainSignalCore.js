const http = require("http");
const io = require("socket.io");

class iBrainSignalCore {
  constructor(options = {}) {
    this.subscriptions = new Map();
    this.server = http.createServer();
    this.io = io(this.server, options.io);

    this.io.on("connection", (socket) => {
      // Handle subscription requests
      socket.on("subscribe", (topic) => {
        this.subscribe(socket, topic);
      });

      // Handle unsubscription requests
      socket.on("unsubscribe", (topic) => {
        this.unsubscribe(socket, topic);
      });

      // Handle events from clients
      socket.on("event", (data) => {
        this.publish(data.topic, data.message);
      });

      // Handle client disconnect
      socket.on("disconnect", () => {
        this.unsubscribeAll(socket);
      });
    });
  }

  /**
    
    Subscribe a client to a topic.
    @param {Socket} socket - The client's Socket.io socket.
    @param {string} topic - The topic to subscribe to.
    */
  subscribe(socket, topic) {
    if (!this.subscriptions.has(topic)) {
      this.subscriptions.set(topic, new Set());
    }
    this.subscriptions.get(topic).add(socket);
  }
  /**
    
    Unsubscribe a client from a topic.
    @param {Socket} socket - The client's Socket.io socket.
    @param {string} topic - The topic to unsubscribe from.
    */
  unsubscribe(socket, topic) {
    if (this.subscriptions.has(topic)) {
      this.subscriptions.get(topic).delete(socket);
    }
  }
  /**
    
    Unsubscribe a client from all topics.
    @param {Socket} socket - The client's Socket.io socket.
    */
  unsubscribeAll(socket) {
    for (const subscribers of this.subscriptions.values()) {
      subscribers.delete(socket);
    }
  }
  /**
    
    Publish an event to all clients subscribed to a topic.
    @param {string} topic - The topic to publish to.
    @param {any} message - The event data to publish.
    */
  publish(topic, message) {
    if (this.subscriptions.has(topic)) {
      const subscribers = this.subscriptions.get(topic);
      for (const subscriber of subscribers) {
        subscriber.emit("event", { topic, message });
      }
    }
  }
  /**
    
    Start the server.
    @param {number} port - The port to listen on.
    */
  start(port) {
    this.server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
  /**
    
    Stop the server.
    */
  stop() {
    this.io.close();
    this.server.close();
  }
}

exports.iBrainSignalCore = iBrainSignalCore;
