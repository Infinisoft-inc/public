import { createEventHub } from '@brainstack/hub';
import { createLogger } from '@brainstack/log';
import { createBridgeClient, createBridgeServer } from "@brainstack/bridge"

const hub_test = () => {
  {// Create an event hub
    const eventHub = createEventHub({
      source: 'unknown',
      logger: createLogger(3),
    });

    // Subscribe to an event
    const unsubscribe = eventHub.on(/.*/, (payload: any) => {
      // Handle the event
      console.log('Event received:', payload);
    });

    // Emit an event
    eventHub.emit('button.click', { message: 'Hello, world!' });

    // Unsubscribe from the event
    unsubscribe();
  }
}

const bridge_test = () => {
  const start_server = () => {
    const server = createBridgeServer();
    server.hub.on("simple", (e:any)=>{console.log("MY SUBSCIPTION", e)})
    server.listen({host:"127.0.0.1", port:8080})
    server.hub.emit("click.mouse", {payload: "jello"})
  }
  const start_client = () => {
    const client = createBridgeClient()
    client.connect({host:"127.0.0.1", port:8080})
    setTimeout(()=>client.hub.emit("simple", { data: "turlute" }),2000)
  }

  start_server()
  start_client()
}

bridge_test()