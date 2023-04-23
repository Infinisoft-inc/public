import { iBrainMicroStore } from "{{_BRAINSTACK_MICROSTORE}}";

const d = iBrainMicroStore({count: 1});

console.log(d.getState())