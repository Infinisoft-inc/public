import React, { createContext, useContext, useEffect, ReactNode, useState, useRef } from "react";
import { createCoreClient } from "@brainstack/core";
import { BrainStackContextInterface, BrainStackProviderProps } from "./abstraction";

const core = createCoreClient({ stateOptions: {} })

const useOn = (event: string, handler: Function) => {
  useEffect(() => {
    const removeHandler = core.hub.on(event, handler);
    return () => removeHandler();
  }, []);
};
const initialState = {
  ...core, useOn
}
const BrainStackContext = createContext(initialState)

/**
 * Establishes a connection with a BrainStack server.
 *
 * @param {object} options - The options for the connection.
 * @param {string} options.host - The host address for the server.
 * @param {number} options.port - The port number for the server.
 */
export const useInitBrainStack = ({ host = "127.0.0.1", port = 3001 }) => {
  const clientRef = useRef<any>()
  const client = useContext(BrainStackContext);

  useEffect(() => {
    // Create a reference to the client object using a useRef hook
    // This allows us to access the client object inside the event listener and cleanup function
    clientRef.current = client.connect({ host, port })

    // Create an event listener for all events on the hub object
    // The regular expression /.*/ matches all event names
    const unsubscribe = client.hub.on(/.*/, (e: { event: string, payload: any }) => {
      // When an event is received, send it as a JSON string over the WebSocket connection
      // The clientRef.current?.send() syntax ensures that send() is only called if clientRef.current is defined
      clientRef?.current?.send(JSON.stringify(e))
    })

    // Return a cleanup function that removes the event listener and closes the WebSocket connection
    // The cleanup function is called when the component unmounts or the dependency list changes
    return () => {
    // Safely call the unsubscribe function to remove the event listener
      unsubscribe?.()
    // Close the WebSocket connection using the close() method on the client object
    // The clientRef.current?.close() syntax ensures that close() is only called if clientRef.current is defined
      clientRef?.current?.close?.()
    }
  }, [host, port])
}

/**
 * Provides a context for the useBrainStack hook.
 *
 * @param {object} props - The props for the component.
 * @param {React.ReactNode} props.children - The child elements to be rendered.
 * @returns {React.ReactNode} The BrainStack context provider.
 */
export const BrainStackProvider: React.FC<BrainStackProviderProps> = ({ children }) => {
  const [data, setData] = useState<BrainStackContextInterface<typeof initialState>>(initialState)

  // Sync external store with data
  React.useSyncExternalStore(
    () => core.hub.on(/.*/, (e: any) => { core.logger.info(`useSyncExternalStore Event Triggered `, e) }),
    () => setData
  );

  return (
    <BrainStackContext.Provider value={{ ...data, useOn }}>
      {children}
    </BrainStackContext.Provider>
  );
};

/**
 * Consumes the BrainStack context and provides access to the data.
 *
 * @returns {object} The BrainStack context.
 */
export const useBrainStack = () => useContext(BrainStackContext);
