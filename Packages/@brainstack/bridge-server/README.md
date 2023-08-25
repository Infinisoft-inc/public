# @brainstack/bridge-server

@brainstack/bridge-server is a WebSocket bridge server that allows bridge client to connect. Will emit all receieved event and forward all local events.

## Installation

npm install @brainstack/bridge-server

## Usage

import { createBridgeServer } from "@brainstack/bridge-server";

const bridgeServer = createBridgeServer();

bridgeServer.listen({ host: "localhost", port: 3000 });

The createBridgeServer() function returns an instance of the bridge server that can be used to start listening for incoming connections. The listen() method takes an options object with the host and port properties, which specify the host address and port number to listen on.

## Configuration

The createBridgeServer() function takes an optional options object that allows you to configure the bridge server. The following properties can be set on the options object:

- logger: An optional logger instance to use for logging. If not provided, a default logger instance will be created.
- hub: An optional event hub instance to use for communication. If not provided, a default event hub instance will be created.
- ws_server: An optional WebSocket server instance to use for connections. If not provided, a new WebSocket server instance will be created.

## API

The following methods are available on a bridge server instance:

- listen(options: { host: string; port: number }): Server: Starts listening for incoming connections on the specified host and port. Returns the WebSocket server instance used for connections.
- close(): void: Closes the WebSocket server instance.
- logger: Logger: The logger instance used by the bridge server.
- hub: EventHub: The event hub instance used by the bridge server.
- ws_server: WebSocket.Server: The WebSocket server instance used by the bridge server.

## Events

The following events are emitted by the bridge server:

- start: Emitted when the bridge server starts listening for incoming connections.
- connection(ws: WebSocket): Emitted when a client connects to the bridge server. The ws parameter is the WebSocket instance for the connection.
- close: Emitted when the bridge server is closed.
- error(error: any): Emitted when an error occurs on the bridge server. The error parameter is the error that occurred.

## License

This package is licensed under the MIT License.