import { createEventHub } from '@brainstack/hub';
import { createLogger } from '@brainstack/log';
import { createBridgeClient, createBridgeServer } from "@brainstack/bridge"

const start_client = () => {
  const client = createBridgeClient()
  client.connect({ host: "127.0.0.1", port: 8080 })
  // client.hub.on("simple", (e:any) => { client.logger.verbose(e?.name) })


  setTimeout(() => client.hub.emit("simple", { data: "client2" }), 2000)
}

start_client()
