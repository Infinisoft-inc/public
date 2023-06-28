import  MockWebSocket from "jest-websocket-mock";
import { createMicroBridgeServer, BridgeOptions } from "..";
import { WebSocket } from "ws";

describe("createMicroBridgeServer", () => {
  let options: BridgeOptions;
  let hub: any;
  let logger: any;
  let ws: WebSocket;

  beforeEach(() => {
    hub = {
      on: jest.fn(),
      emit: jest.fn(),
    };

    logger = {
      log: jest.fn(),
      error: jest.fn(),
    };

    ws = new MockWebSocket("ws://localhost") as any;
    options = {
      hub,
      logger,
      ws,
    };
  });

  afterEach(() => {
    ws.close()
    jest.clearAllMocks();
  });

  test("should start the MicroBridge server and handle events", () => {
    const server = createMicroBridgeServer(options);
    server.start();

    // Mock an incoming message event
    const eventData = {
      data: JSON.stringify({ event: "testEvent", payload: { foo: "bar" } }),
    };

    hub.emit("test", eventData)

    expect(hub.on).toHaveBeenCalled();
    expect(hub.emit).toHaveBeenCalled();
    expect(logger.log).toHaveBeenCalled();
  });


});
