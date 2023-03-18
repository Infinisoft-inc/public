const { Server } = require("socket.io");
const { createServer } = require("http");
const Client = require("socket.io-client");
const { iBrainSignalCore } = require("./iBrainSignalCore");

describe("iBrainSignalCore", () => {
  let signal;
  let client;
  let server;

  beforeEach(async (done) => {
    server = new Server().listen()
    signal = new iBrainSignalCore({ io: { server } });
    client = new Client(`http://localhost:${server..address().port}`);
    client.on("connect", done);
  });

  afterEach(() => {
    signal.stop();
    client.close();
  });

  test("should subscribe a client to a topic", () => {
    client.emit("subscribe", "test-topic");
    expect(signal.subscriptions.has("test-topic")).toBe(true);
    expect(signal.subscriptions.get("test-topic").has(client)).toBe(true);
  });

  test("should unsubscribe a client from a topic", () => {
    client.emit("subscribe", "test-topic");
    client.emit("unsubscribe", "test-topic");
    expect(signal.subscriptions.get("test-topic").has(client)).toBe(false);
  });

  test("should unsubscribe a client from all topics on disconnect", () => {
    client.emit("subscribe", "test-topic-1");
    client.emit("subscribe", "test-topic-2");
    client.close();
    expect(signal.subscriptions.get("test-topic-1").has(client)).toBe(false);
    expect(signal.subscriptions.get("test-topic-2").has(client)).toBe(false);
  });

  test("should publish an event to all clients subscribed to a topic", (done) => {
    client.emit("subscribe", "test-topic");
    client.on("event", (data) => {
      expect(data.topic).toBe("test-topic");
      expect(data.message).toBe("test-message");
      done();
    });
    signal.publish("test-topic", "test-message");
  });

  test("should not publish an event to clients not subscribed to a topic", (done) => {
    client.on("event", () => {
      throw new Error("Client should not receive event");
    });
    signal.publish("test-topic", "test-message");
    setTimeout(done, 100);
  });
});
