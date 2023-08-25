
# Brainstack Core
The @brainstack/core package provides a function createCore that creates a core object with a state, a bridge client/server, and a logger.

## Installation
To install @brainstack/core, run the following command:
```sh
npm install @brainstack/core
```

## Usage
To use createCore, import it along with the necessary dependencies:

```js
import { createCore } from '@brainstack/core';

const core = createCore();
```
The core object returned by createCore includes the following properties:

state: a state object created with createState
bridge: a bridge client or server object created with BridgeServer or BridgeClient
logger: a logger object created with createLogger

## API
### createCore(options: CoreOptions): object
Creates a core object with a state, a bridge client/server, and a logger.

**Arguments**
options (object): An object with the following properties:
stateOptions (any): Options for createState.

**Returns**
The core object with the following properties:

state (object): The state object created with createState.
bridge (object): The bridge client or server object created with BridgeServer or BridgeClient.
logger (object): The logger object created with createLogger.