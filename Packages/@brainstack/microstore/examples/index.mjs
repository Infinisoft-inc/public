import { iBrainMicroStore } from "@brainstack/microstore";

const d = iBrainMicroStore({count: 1});

console.log(d.getState())