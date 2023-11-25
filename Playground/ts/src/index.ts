import { createBridgeClient } from "/home/nitr0gen/public/Packages/@brainstack/bridge-client";
import { createBridgeServer } from "/home/nitr0gen/public/Packages/@brainstack/bridge-server";

const srv = createBridgeServer();

const s = srv.listen({ port: 8888, host: "0.0.0.0" });
s.on('connection',(ws)=>{
    ws.send('Hey whats up!')
})





const c = createBridgeClient();
const e = c.connect({ host: "0.0.0.0", port: 8888 });

e.onopen = (ev) => {
  e.onmessage = (msg) => {
    console.log(msg.data);
  };
  e.onerror=err=>{
    console.error(err)
  }
};
