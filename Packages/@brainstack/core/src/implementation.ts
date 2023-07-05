import { StateFactory, State } from '@brainstack/state';
import { BridgeServerFactory, BridgeServer, BridgeClientFactory, BridgeClient } from '@brainstack/bridge';
import { CoreOptions } from './abstraction';


export const createCore = ({
  stateOptions = {},
  bridgeOptions = {},
  stateFactory = new StateFactory(),
  bridgeClientFactory = new BridgeClientFactory(),
  bridgeServerFactory = new BridgeServerFactory(),
}: CoreOptions = {}) => {
  const state: State<any> = stateFactory.createState(stateOptions);

  let bridge: BridgeClient | BridgeServer;

  const connect = () => {
    bridge = bridgeClientFactory.createClient(bridgeOptions);
    bridge.connect();
  };

  const serve = () => {
    bridge = bridgeServerFactory.createServer(bridgeOptions);
    bridge.listen();
  };

  const getState = (selector?: (state: any) => any) => state.getState(selector);
  const mutate = (mutator: (currentState: any) => any) => state.mutate(mutator);
  const emit = (event: string, data?: any) => bridge.hub.emit(event, data);
  const on = (event: string, listener: (...args: any[]) => void) => bridge.hub.on(event, listener);
  const log = (message: string) => bridge.logger.log(message);
  const error = (message: string) => bridge.logger.error(message);
  const info = (message: string) => bridge.logger.info(message);
  const warn = (message: string) => bridge.logger.warn(message);

  return { connect, serve, getState, mutate, emit, on, log, error, info, warn };
};