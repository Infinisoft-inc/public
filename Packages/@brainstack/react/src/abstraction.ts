import { ReactNode } from "react";

export type BrainStackContextInterface = {
    useOn: (event: string, handler: Function) => void;
}

export interface BrainStackProviderProps {
    children: ReactNode;
}