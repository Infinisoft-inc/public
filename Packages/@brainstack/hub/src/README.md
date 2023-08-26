# Event Hub
 Event Hub is a TypeScript library that allows users to easily subscribe to and emit events with a variety of features to make event handling simple and efficient. It supports both string and regular expression event names, giving users full control over their event handling. Additionally, Event Hub prevents event duplication, ensuring that events are handled efficiently and effectively.

## Installation
You can install Event Hub using your preferred package manager:

```sh
npm install @brainstack/hub
```

## Usage
To use Event Hub, simply create an event hub and subscribe to events:

```typescript
import { createEventHub } from '@brainstack/hub';

const eventHub = createEventHub();

// Subscribe to an event
eventHub.on('myEvent', (payload) => {
  console.log(`Received payload for event 'myEvent': ${payload}`);
});

// Emit an event
eventHub.emit('myEvent', 'Hello, world!');
```

## Documentation
For detailed documentation on how to use Event Hub, please see our documentation at https://brainstack.dev.

## Contributing
We welcome contributions from the community! Please see our contributing guidelines for more information.

## License
Event Hub is licensed under the MIT License.