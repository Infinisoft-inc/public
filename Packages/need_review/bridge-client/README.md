# Bridge Client Module
Will connect to a bridge server and forward all local bridge event to it.

## Parameters
**options**: BridgeClientOption (optional) - Optional configuration options for the bridge client.
**options.logger**: Logger (optional) - Optional logger instance to use for logging.
**options.hub**: EventHub (optional) - Optional event hub instance to use for communication.
**options.ws_client**: WebSocket (optional) - Optional WebSocket instance to use for the client connection.

## Returns
**BridgeClient** - An instance of the bridge client.  
## Throws  
Will throw an error if the bridge client is already connected.  

## Example Usage
```typescript
const bridgeClient = createBridgeClient();

bridgeClient.connect({ host: "localhost", port: 3000 });
```

## Functions
**connect**: Connects the bridge client to the provided destination.
**close**: Closes the bridge client connection.
**logger**: The logger instance used for logging.
**hub**: The event hub instance used for communication.