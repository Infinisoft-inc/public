import { createEventHub } from "@brainstack/hub";
import { BridgeServer } from "../implementation";
import { createLogger } from "@brainstack/log";

new BridgeServer(createEventHub(),createLogger(5))