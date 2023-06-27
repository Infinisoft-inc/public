# @brainstack/hub

## Description
The `@brainstack/hub` package is a powerful event hub that allows you to manage and handle events in your application. It provides a simple and flexible API for subscribing to events and triggering event handlers.

## Features
- Subscribe to events using string names or regular expressions.
- Execute callback functions when events are emitted.
- Remove event handlers from subscribed events.
- Prevent event duplication to avoid unnecessary processing.
- Support for custom options such as event source and logging.

## Getting Started
### Install
You can install the package using npm or yarn:

```bash
npm install @brainstack/hub
```

or

```bash
yarn add @brainstack/hub
```

### Run
To start using the `@brainstack/hub` package, follow these steps:

1. Import the `createEventHub` function from the package:

```typescript
import { createEventHub } from '@brainstack/hub';
```

2. Create an instance of the event hub:

```typescript
const eventHub = createEventHub();
```

3. Subscribe to events using the `on` method:

```typescript
const unsubscribe = eventHub.on('eventName', (payload) => {
  // Handle the event here
});

// You can unsubscribe from the event later
unsubscribe();
```

4. Emit events using the `emit` method:

```typescript
eventHub.emit('eventName', { /* payload data */ });
```

## Use Case Walkthrough
### Use Case 1: User Registration
1. Subscribe to the `'user.registered'` event and handle it by sending a welcome email to the user.
2. Emit the `'user.registered'` event when a new user registers in your application.

### Use Case 2: Data Processing
1. Subscribe to all events matching the regular expression `/data\..*/` to process incoming data.
2. Emit specific events such as `'data.created'`, `'data.updated'`, and `'data.deleted'` when data operations occur.

## Footer
For more details and advanced usage, please refer to the package documentation.

[Include any additional information or acknowledgments here]
