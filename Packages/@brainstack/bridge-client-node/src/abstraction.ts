import { EventHub } from "@brainstack/hub";
import { Logger } from "@brainstack/log";

export interface BridgeClientOptions {
  url: string;
  reconnectInterval?: number;  // in milliseconds
  maxReconnectAttempts?: number;
  logger?: Logger;
  hub?: EventHub
}

export type Payload = { event: string; data: any; };
export type EventHandler = (data: Buffer) => void;