# @brainstack/rules-engine

The `@brainstack/rules-engine` is a customizable and lightweight rules engine package for evaluating business rules and conditional logic in TypeScript applications.

## Features

- Flexible rule definitions
- Evaluate multiple rules and return the triggered ones
- Simple to integrate into any application

## Installation

To install the `@brainstack/rules-engine` package, use the following command:

```bash
npm install @brainstack/rules-engine
```

## Getting Started

Here's how to get started with the `@brainstack/rules-engine`:

### Define your rules

First, define the rules that you want the engine to evaluate. Each rule's name and evaluation function must be clearly specified:

```typescript
import { RuleFunction, IRule, RulesEngine } from '@brainstack/rules-engine';

const isOver18: RuleFunction = (data) => data.age > 18;
const isEmployed: RuleFunction = (data) => data.employed === true;

const rules: IRule[] = [
  { name: 'Adult', evaluate: isOver18 },
  { name: 'Employed', evaluate: isEmployed }
];

const engine = new RulesEngine(rules);
```

### Evaluate the rules

Once your rules are defined, use the `RulesEngine` instance to evaluate data against them:

```typescript
// Sample data object
const userData = { age: 21, employed: true };

// Evaluate the rules
const results = engine.evaluate(userData);
console.log(results); // Output: ['Adult', 'Employed']
```

### Integrate into your application

Integrate the `@brainstack/rules-engine` within your application wherever you need to evaluate business rules:

```typescript
// In an application method
if (engine.evaluate(userData).includes('Employed')) {
  // Take some action based on the rule
}
```

## Documentation

Refer to the detailed documentation for advanced usage, API references, and more on how to leverage the full power of the `@brainstack/rules-engine`.

## Contributing

Contributions to the `@brainstack/rules-engine` are welcome! Please submit any issues or pull requests to the repository.
