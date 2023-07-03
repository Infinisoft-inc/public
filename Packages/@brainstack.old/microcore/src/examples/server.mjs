import { iBrainMicroStore } from "@brainstack/microstore";
import { microstoreBridge } from "@brainstack/microstore-bridge/dist/index.esm.min.mjs";
import { WebSocketServer } from "ws";

const BACKEND_BRIDGE_PORT="8080"
const store = iBrainMicroStore();
const ws = new WebSocketServer({ port: BACKEND_BRIDGE_PORT });

ws.on('connection', _ws => {
    const backendBridge = microstoreBridge(store, _ws);
    console.log(`Connexion received on port ${ws.options.port ?? 8080}`);
    backendBridge.start();
});


store.on("front_click", payload=>{
    console.log(`${payload.name}`)
})
// setInterval(() => {
//     store.emit("send_from_back", {
//         "eventName": "send_from_back",
//         "data": "hello data",
//         "headers": [{
//             "uuid": "3b317146-b789-13cb-be09-980e5ca216c8",
//             "timestamp": 1687046325506
//         }]
//     });
// }, 5000);
