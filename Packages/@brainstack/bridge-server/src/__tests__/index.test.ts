// import { Server } from "ws";
// import {BridgeServerOption } from "../abstraction";
// import { createBridgeServer} from "../implementation";
// import { Logger, LoggerIntegration } from "@brainstack/log";
// import { EventHub } from "@brainstack/hub";

// // Mock the WebSocket server instance
// jest.mock("ws", () => ({
//   Server: jest.fn().mockImplementation(() => ({
//     on: jest.fn(),
//     close: jest.fn(),
//   })),
// }));

// describe("createBridgeServer", () => {
//   let ws_server: Server;

//   beforeEach(() => {
//     // Reset the mock WebSocket server instance before each test
//     (Server as unknown as jest.Mock).mockClear();
//     ws_server = new Server();
//   });

//   it("creates a bridge server instance with default options", () => {
//     const server = createBridgeServer();
//     expect(server.logger).toBeDefined();
//     expect(server.hub).toBeDefined();
//     expect(server.ws_server).toBeUndefined();
//   });

//   it("creates a bridge server instance with custom options", () => {
//     const logger:Logger = {
//       info: jest.fn(),
//       error: jest.fn(),
//       log: jest.fn(),
//       integrations: [],
//       level: 0,
//       changeLogLevel: jest.fn(),
//       addIntegration: jest.fn(),
//       removeIntegration: jest.fn(),
//       warn: function (...message: any[]): void {
//         throw new Error("Function not implemented.");
//       },
//       verbose: jest.fn()
//     };
//     const hub: EventHub = {
//       emit: jest.fn(),
//       on:jest.fn(),
//       uuid: ""
//     };
//     const options: BridgeServerOption = {
//       logger,
//       hub,
//       ws_server,
//     };
//     const server = createBridgeServer(options);
//     expect(server.logger).toBe(logger);
//     expect(server.hub).toBe(hub);
//     expect(server.ws_server).toBe(ws_server);
//   });

//   it("starts listening for incoming connections", () => {
//     const server = createBridgeServer({ws_server});
//     const options = { host: "localhost", port: 3000 };
//     server.listen(options);
//     expect(ws_server.on).toHaveBeenCalledWith(
//       "listening",
//       expect.any(Function)
//     );
//     expect(ws_server.on).toHaveBeenCalledWith(
//       "connection",
//       expect.any(Function)
//     );
//     expect(ws_server.on).toHaveBeenCalledWith(
//       "close",
//       expect.any(Function)
//     );
//     expect(ws_server.on).toHaveBeenCalledWith(
//       "error",
//       expect.any(Function)
//     );
//   });

//   it("closes the WebSocket server instance", () => {
//     const server = createBridgeServer({ ws_server });
//     server.close();
//     expect(ws_server.close).toHaveBeenCalled();
//   });
// });

export {}