import { BridgeClient } from './implementation';

const start = async () => {
  const c = new BridgeClient();
  c.connect('ws://127.0.0.1:57161')
};

start();
