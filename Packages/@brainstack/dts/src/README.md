# Data Transformation Service

The Data Transformation Service is responsible for serializing and deserializing WebSocket messages, as well as delegating the handling of different types of messages to registered handlers.

## Features

- **Serialization**: Convert message objects to JSON strings for transmission over WebSocket.
- **Deserialization**: Convert JSON strings received from WebSocket back into message objects.
- **Message Handling**: Delegate message handling to registered actions handlers.

## Registering Handlers

Handlers are functions linked to specific message 'actions' that define how incoming messages should be processed. To register a new handler, follow these steps:

1. Create a new handler function in the appropriate directory (e.g., `./Handlers`). This function should accept a payload matching the structure expected by the action it handles.

   ```typescript
   // Example: ./Handlers/new.action.ts
   export default function(payload: NewActionPayload) {
     // Handle the payload
   }
   ```

2. The file name (without extension) determines the action name that this handler will respond to.

3. Import and register the handler in the `DataTransformationService`'s constructor or through the `registerHandler` method.

   ```typescript
   import NewActionHandler from './Handlers/new.action';

   const dataTransformationService = new DataTransformationService();
   dataTransformationService.registerHandler('new.action', NewActionHandler);
   ```

Now, when a WebSocket message with action 'new.action' is received, `NewActionHandler` will be executed to process it.

## Serialization and Deserialization

Use the `serializeMessage` method to convert a message object to a JSON string:

   ```typescript
   const jsonString = dataTransformationService.serializeMessage({action: 'new.action', payload: {...}});
   ```

Use the `deserializeMessage` method to convert a JSON string back to a message object:

   ```typescript
   const message = dataTransformationService.deserializeMessage(jsonString);
   if (message) {
     // The message object now contains the action and payload
   }
   ```

Use `handleIncomingMessage` to process incoming messages and invoke associated handlers:

   ```typescript
   dataTransformationService.handleIncomingMessage(jsonString);
   // Or for Buffer data:
   dataTransformationService.handleIncomingMessage(bufferData);
   ```

If the service receives a message with an action that does not have a registered handler, a 'not.found' handler will be invoked if present.
