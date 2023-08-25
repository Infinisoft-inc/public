import { createEventHub } from '@brainstack/hub';
import { createLogger } from '@brainstack/log';
import { WebSocket, Server } from 'ws';
import { createBridgeClient, createBridgeServer } from '..'; // Replace 'your-module' with the actual module name

jest.mock('@brainstack/hub');
jest.mock('@brainstack/log');
jest.mock('ws');

describe('createBridgeClient', () => {
  let wsMock: WebSocket;
  let hubMock: any;
  let loggerMock: any;

  beforeEach(() => {
    wsMock = new WebSocket("mock");
    hubMock = createEventHub();
    loggerMock = createLogger();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('connect should establish a WebSocket connection and set up event handlers', () => {
    const bridgeClient = createBridgeClient({ hub: hubMock, logger: loggerMock, ws_client: wsMock });
    const host = '127.0.0.1';
    const port = 8080;

    bridgeClient.connect({ host, port });

    expect(wsMock.addEventListener).toHaveBeenCalledWith('message', expect.any(Function));
    expect(wsMock.addEventListener).toHaveBeenCalledWith('open', expect.any(Function));
    expect(wsMock.addEventListener).toHaveBeenCalledWith('close', expect.any(Function));
    expect(wsMock.addEventListener).toHaveBeenCalledWith('error', expect.any(Function));
    expect(hubMock.on).toHaveBeenCalledWith(/.*/, expect.any(Function));
    // Additional assertions...
  });

  // Additional tests...
});

describe('createBridgeServer', () => {
  let wssMock: Server;
  let hubMock: any;
  let loggerMock: any;

  beforeEach(() => {
    wssMock = new Server();
    hubMock = createEventHub();
    loggerMock = createLogger();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('listen should create a WebSocket server and set up event handlers', () => {
    const bridgeServer = createBridgeServer({ hub: hubMock, logger: loggerMock, ws_server: wssMock });
    const host = '127.0.0.1';
    const port = 8080;

    bridgeServer.listen({ host, port });

    expect(wssMock.on).toHaveBeenCalledWith('connection', expect.any(Function));
  });

  test('close should close the WebSocket server', () => {
    const bridgeServer = createBridgeServer({ hub: hubMock, logger: loggerMock, ws_server: wssMock });

    bridgeServer.close();

    expect(wssMock.close).toHaveBeenCalled();
  });

});
