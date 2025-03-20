# Understanding Event-Driven Architecture with @brainstack/hub

This directory contains the example code for the article "Understanding Event-Driven Architecture with @brainstack/hub". The examples demonstrate fundamental concepts of event-driven architecture using @brainstack/hub.

## Core Concepts Demonstrated

1. **Event Hub Creation and Configuration**
   - Creating an event hub with options
   - Adding logging capabilities
   - Basic configuration

2. **Event Patterns**
   - Basic event subscription and emission
   - Pattern-based event matching using RegExp
   - Type-safe event handling with TypeScript

3. **Best Practices**
   - Proper event naming conventions
   - Error handling strategies
   - Clean subscription management

## Project Structure

- `src/basic-usage.ts` - Core event hub concepts and patterns
- `src/basic-usage.test.ts` - Tests demonstrating event handling
- `src/index.ts` - Main entry point showcasing examples

## Running the Examples

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Run the examples:
   ```bash
   npm start
   ```

## Running Tests

To run the test suite:

```bash
npm test
```

## Key Takeaways

1. **Loose Coupling**
   - Components communicate through events
   - No direct dependencies between parts

2. **Type Safety**
   - TypeScript interfaces for event data
   - Pattern matching for event types

3. **Error Handling**
   - Global error handlers
   - Try-catch in event processors

## Requirements

- Node.js v16 or later
- TypeScript 4.x or later

## Related Packages

- @brainstack/hub
- @brainstack/log