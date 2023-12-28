// main.ts
import { createLogger } from '@brainstack/log';
import { DataTransformationService } from '..';
import { createEventHub } from '@brainstack/hub';
import { BridgeClient } from '@brainstack/bridge-client-node';

// Setup Logger
const logger = createLogger(5);

// Setup EventHub
const hub = createEventHub();

// Initialize DataTransformationService
const dts = new DataTransformationService(hub, logger);

// Initialize BridgeClient
const client = new BridgeClient({ logger, hub });
client.connect('ws://localhost:8888');

