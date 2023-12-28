import { EventHub, Options } from "@brainstack/hub";
import { Logger, LoggerIntegration } from "@brainstack/log";


export interface BridgeClientOptions {
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  logger?: Logger;
  loggerOptions?: {level?: number, integrations?: LoggerIntegration[]}
  hub?: EventHub;
  hubOptions?: Options;

}

export type Payload = { event: string; data: any; };
export type EventHandler = (data: Buffer) => void;