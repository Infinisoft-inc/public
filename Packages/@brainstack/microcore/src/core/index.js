import {iBrainMicroStore} from '@brainstack/microstore';
import { bridgeStore } from '@brainstack/microstore-bridge';

class Microcore {
  constructor(initialState, options) {
    this.store = new iBrainMicroStore(initialState, options.);
    this.bridgeStore = bridgeStore(this.store);
  }

  mutate(){
    return this.store.mutat
  }
  // Wrapper methods for MicroStore functionality
  // optional selector retuens the entire state
  // defined  slector narrow the result
  getState(selector=s=>s) {
    return selector(this.store.getState());
  }

  emit(eventName, payload={}) {
    return this.store.on(eventName, payload);
  }

  on(eventName, listener) {
    return this.store.subscribe(listener);
  }

  // Wrapper methods for MicroStore-Bridge functionality

  connect() {
    return this.bridgeStore.connect();
  }

  disconnect() {
    return this.bridgeStore.disconnect();
  }

  isConnected() {
    return this.bridgeStore.isConnected();
  }

  send(message) {
    return this.bridgeStore.send(message);
  }

  onMessage(handler) {
    return this.bridgeStore.onMessage(handler);
  }
}

export default MicroCore;