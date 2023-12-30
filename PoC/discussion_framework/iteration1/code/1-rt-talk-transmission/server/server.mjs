import { BridgeServer } from '@brainstack/bridge-server';
import { createLogger } from '@brainstack/log';

const log = createLogger(5)

const run = () => {
    const bridge = new BridgeServer(log)

    bridge.listen({ host: "127.0.0.1", port: 6667 })
    bridge.onMessage((data, uuid) => {
        console.log(`Received: `, data, " from ", uuid)
    })
}

run()