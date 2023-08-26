import { createEventHub } from "@brainstack/hub";
import { createLogger } from "@brainstack/log";
import { createState } from "@brainstack/state";
import { ReactNode } from "react";

export type BrainStackContextInterface = {
    useOn: (event: string, handler: Function) => void;
}

export interface BrainStackProviderProps {
    children: ReactNode;
}

export type TBrainstackOptions = {
    eventHubOptions?: Parameters<typeof createEventHub>;
    stateOptions?: Parameters<typeof createState>;
    loggerOptions?: Parameters<typeof createLogger>;
  };
  