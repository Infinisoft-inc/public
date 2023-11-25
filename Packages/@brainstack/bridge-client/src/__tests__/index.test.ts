// import { BridgeClient, createBridgeClient } from '..';
// import { BridgeServer, createBridgeServer } from '@brainstack/bridge-server';

// jest.mock('@brainstack/bridge-server')

// describe('WebSocket client', () => {
//   let bridgeClient: BridgeClient;
//   let mockServer: BridgeServer;

//   beforeEach(() => {
//     mockServer = createBridgeServer({});
//     bridgeClient = createBridgeClient();
//   });

//   afterEach(() => {
//     mockServer.close();
//     bridgeClient.close();
//   });

//   it('should connect to WebSocket server', () => {
//     const destination = { host: 'localhost', port: 3000 };
//     const client = bridgeClient.connect(destination);
//     expect(client.readyState).toEqual(client.OPEN);
//   });

//   it('should emit events when connected', () => {
//     const destination = { host: 'localhost', port: 3000 };
//     const connectSpy = jest.fn();
//     const heartbeatStartedSpy = jest.fn();
//     bridgeClient.hub.on('bridge.connected', connectSpy);
//     bridgeClient.hub.on('bridge.heartbeat.started', heartbeatStartedSpy);
//     bridgeClient.connect(destination);
//     // mockServer.emit('open',{});
//     expect(connectSpy).toHaveBeenCalledTimes(1);
//     expect(heartbeatStartedSpy).toHaveBeenCalledTimes(1);
//   });

//   it('should emit events when disconnected', () => {
//     const destination = { host: 'localhost', port: 3000 };
//     const connectSpy = jest.fn();
//     const heartbeatStoppedSpy = jest.fn();
//     bridgeClient.hub.on('bridge.connected', connectSpy);
//     bridgeClient.hub.on('bridge.heartbeat.stopped', heartbeatStoppedSpy);
//     bridgeClient.connect(destination);
//     // mockServer.emit('open',{});
//     bridgeClient.close();
//     // mockServer.emit('close',{});
//     expect(connectSpy).toHaveBeenCalledTimes(1);
//     expect(heartbeatStoppedSpy).toHaveBeenCalledTimes(1);
//   });

//   it('should reconnect when disconnected', async () => {
//     const destination = { host: 'localhost', port: 3000 };
//     const client = bridgeClient.connect(destination);
//     // mockServer.emit('open',{});
//     // mockServer.emit('close',{});
//     await new Promise((resolve) => setTimeout(resolve, 6000)); // Wait for 6 seconds
//     expect(client.readyState).toEqual(client.OPEN);
//   });
// });

export {}