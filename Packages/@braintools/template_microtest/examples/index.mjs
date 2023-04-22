import { iBrainMicroStore } from "{{PROJECT_NAME}}";

const d = iBrainMicroStore({count: 1});

console.log(d.getState())