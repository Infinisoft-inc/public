# @brainstack/config

A Micro Config Manager Package

## Installation

Install the package using npm:

```bash
npm install @brainstack/config
```

## Usage

To use the `ConfigManager` and `ConfigManagerIntegration` provided by this package, follow these steps:

1. Import the required interfaces and functions:

```typescript
import { ConfigManager, ConfigManagerIntegration } from '@brainstack/config';
```

2. Create an integration that implements the `ConfigManagerIntegration` interface:

```typescript
const myIntegration: ConfigManagerIntegration<MyValueType> = {
  get(key: string): MyValueType | undefined {
    // Your implementation to retrieve the value for the key
  },
  set(key: string, value: MyValueType): void {
    // Your implementation to set the value for the key
  },
  remove(key: string): void {
    // Your implementation to remove the value for the key
  },
};
```

3. Create a `ConfigManager` instance using the `createConfigManager` function:

```typescript
const configManager: ConfigManager<MyValueType> = createConfigManager(myIntegration);
```

4. Now you can use the `configManager` to interact with your configuration values:

```typescript
// Get a configuration value
const value = configManager.get('myConfigKey');

// Set a configuration value
configManager.set('myConfigKey', newValue);

// Remove a configuration value
configManager.remove('myConfigKey');
```

## Example

Here's an example of how you can use the `@brainstack/config` package:

```typescript
import { ConfigManager, ConfigManagerIntegration, createConfigManager } from '@brainstack/config';

// Define an integration
const myIntegration: ConfigManagerIntegration<number> = {
  get(key: string): number | undefined {
    // Implementation to retrieve the value for the key
  },
  set(key: string, value: number): void {
    // Implementation to set the value for the key
  },
  remove(key: string): void {
    // Implementation to remove the value for the key
  },
};

// Create a ConfigManager instance
const configManager: ConfigManager<number> = createConfigManager(myIntegration);

// Use the configManager to get, set, and remove configuration values
const value = configManager.get('myConfigKey');
configManager.set('myConfigKey', newValue);
configManager.remove('myConfigKey');
```

# Contributing
Contributions are welcome! If you would like to contribute to this module, please follow these guidelines:

Fork the repository  
Create a new branch for your changes  
Make your changes and commit them with descriptive commit messages  
Push your changes to your fork  
Submit a pull request  

# License
This module is released under the MIT License.