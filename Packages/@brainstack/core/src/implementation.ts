import { createState, State } from '@brainstack/state';
import { BridgeClient, BridgeClientOption, createBridgeClient } from '@brainstack/bridge-client';
import { BridgeServer, createBridgeServer } from '@brainstack/bridge-server';

export type CoreClientOptions = {
  stateOptions?: any
  coreClientOptions?: BridgeClientOption
  hubOptions?: any
  loggerOptions?: any
}

export const createCoreClient = (options?: CoreClientOptions) => {
  const { stateOptions, coreClientOptions } = options ?? {}
  const state: State<any> = createState(stateOptions);
  const bridgeClient: BridgeClient = createBridgeClient(coreClientOptions)
  const { hub, logger, close, connect } = bridgeClient

  return { state, hub, logger, connect, close };
}

export type CoreServerOptions = {
  stateOptions?: any
  coreServerOptions?: any
  hubOptions?: any
  loggerOptions?: any
}

export const createCoreServer = (options?: CoreServerOptions) => {
  const { stateOptions, coreServerOptions } = options ?? {}
  const state: State<any> = createState(stateOptions);
  const bridgeServer: BridgeServer = createBridgeServer(coreServerOptions)
  const { hub, logger, close, listen } = bridgeServer

  return { state, hub, logger, listen, close };
}