import { iBrainMicroStore } from "@brainstack/microstore";
import { microstoreBridge } from "@brainstack/microstore-bridge/dist/index.esm.min.mjs";
import { WebSocket } from "ws";

const BACKEND_BRIDGE="ws://127.0.0.1:8080"
const store = iBrainMicroStore();
const ws = new WebSocket(BACKEND_BRIDGE);

ws.on('open', () => {
    const frontEndBridge = microstoreBridge(store, ws);
    frontEndBridge.start();
    console.log(`Client connected to backend bridge ${BACKEND_BRIDGE}!`);
});

// store.emit("send_from_front", {payload: {name: "sourcede"}})

// store.on("send_from_back", e => {
//     console.log(`Client received: `, e);
// });

// Commented out the setInterval for emitting events as it was causing duplicate events in the previous code.
// Uncomment it if you need to emit events periodically.
setInterval(() => {
    store.emit("front_clic", {
        "eventName": "front_clic",
        "data": "button click",
        "headers": [{
            "uuid": "3b317146-b789-13cb-be09-980e5ca216c8",
            "timestamp": 1687046325506
        }]
    });
}, 5000);
