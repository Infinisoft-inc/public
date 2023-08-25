// // @brainstack/react

import { createCoreClient } from "@brainstack/core"
import { ReactNode } from "react";

export type BrainStackContextInterface<T,> = ReturnType<typeof createCoreClient> & {
    useOn: (event: string, handler: Function) => void;
}

export interface BrainStackProviderProps {
    children: ReactNode;

}