import { BridgeServer } from '@brainstack/bridge-server';
import { BridgeClient } from '@brainstack/bridge-client-node';
import { createEventHub, EventHub } from '@brainstack/hub';
import { createLogger, Logger } from '@brainstack/log';
import { createState } from '@brainstack/state';
import { DataTransformationService } from '@brainstack/dts';
import { WebSocket } from 'ws';

export class Assistant {
  private server: BridgeServer;
  private client: BridgeClient;
  private dts: DataTransformationService;
  public hub: EventHub;
  public log: Logger;

  constructor(hub: EventHub, log: Logger) {
    this.server = new BridgeServer(log);
    this.client = new BridgeClient({ hub, logger: log });
    this.dts = new DataTransformationService(hub, log);
    this.hub = hub;
    this.log = log;
  }

  public broadcast(ws: WebSocket, raw: string) {
    this.server.broadcast(ws, raw);
  }

  public connect(url: string) {
    this.client.connect(url);
  }

  public listen() {
    this.server.listen({});
  }

  public incoming(arg: any) {
    const data = this.dts.deserializeMessage(arg);
    console.log(data);
  }
}
