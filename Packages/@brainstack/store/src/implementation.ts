import { createEventHub } from '@brainstack/hub';
import { State, createState } from '@brainstack/state';
import { TCRUDArrayOperations, TCRUDObjectOperations, TStoreFactory } from '.';
import { uuidv1 } from './utils';

/**
 * Creates a microstore instance with integrated state management and event handling.
 *
 * @param {TCreateStoreOptions} [options] - Optional options for creating the microstore.
 * @param {Function} options.initializer - A function that initializes the initial state.
 * @param {Array} [options.eventHubOptions] - Options for configuring the event hub.
 *
 * @returns {Object & State & EventHub} A microstore instance with state management and event handling.
 */
export const createStore:TStoreFactory = (options) => {

  /** @type {State} */
  const state = createState(options?.initializer);

  /** @type {EventHub} */
  const hub = createEventHub(options?.eventHubOptions);

  /**
   * Subscribes to changes in the microstore state and returns the current state.
   *
   * @param {Function} callback - The callback function to be called when the state changes.
   * @returns {Function} A function that can be called to unsubscribe from the state changes.
   */
  const subscribe = (
    callback: (_state: ReturnType<typeof state.getState>) => void
  ) => {
    return hub.on('state.changed', () => callback(state.getState()));
  };

  /**
   * Updates the microstore state with a new value and emits a "state.changed" event.
   *
   * @param {Function} mutator - A function that receives the current state and returns the updated state.
   */
  const mutate = (
    mutator: (_state: ReturnType<typeof state.getState>) => any
  ) => {
    state.mutate(mutator);
    hub.emit('state.changed', state.getState());
  };

  const hasId = (item: any) =>{
    if (!item?.id) {
          throw new Error("Item should have an 'id' property");
    }
  }

  /**
 * Creates a set of CRUD operations for a specific domain in the state which is expected to be an array.
 * 
 * @function
 * @param {string} domain - The domain/key in the state for which the CRUD operations are to be created.
 * 
 * @returns {Object} The CRUD operations:
 * 
 * @property {Function} create - Adds a new item to the domain.
 *  @param {Object} item - The item to be added.
 *  @returns {string} ID - Returns the generated ID of the created item.
 * 
 * @property {Function} read - Reads an item from the domain by its ID.
 *  @param {Object} item - The item containing the ID to be read.
 *  @returns {Object} item - Returns the item if found, undefined otherwise.
 * 
 * @property {Function} update - Updates an item in the domain by its ID.
 *  @param {Object} updatedItem - The item containing the ID to be updated and the new values.
 * 
 * @property {Function} delete - Deletes an item from the domain by its ID.
 *  @param {Object} item - The item containing the ID to be deleted.
 * 
 * @property {Function} list - Lists all items in the domain.
 *  @returns {Array} items - Returns an array of items from the domain.
 * 
 * @property {Function} search - Searches items in the domain by a keyword.
 *  @param {string} keyword - The keyword to search by.
 *  @returns {Array} items - Returns an array of items that match the search keyword.
 * 
 * @throws {DOMException} Throws an error if the domain in the state is not an array.
 */
  const createCRUDArray = (domain: keyof State<any>):TCRUDArrayOperations => {
    if (!Array.isArray(state[domain])){
      throw new DOMException("Not an array")
    }

    return {
      create: (item: any) => {
        // Automatically generate an ID for the item
        const id = uuidv1();
        mutate((state: any) => {
          return { ...state, [domain]: [...state[domain], { ...item, id }] };
        });
        return id; // Optionally return the generated ID
      },
      read: (item: { id: string }) => {
        hasId(item)
        return Array(state[domain]).find((existingItem: any) => existingItem.id === item.id);
      },
      update: (updatedItem: any) => {
        hasId(updatedItem)
        mutate((state: any) => {
          const updatedArray = state[domain].map((existingItem: any) => 
            existingItem.id === updatedItem.id ? { ...existingItem, ...updatedItem } : existingItem
          );
          return { ...state, [domain]: updatedArray };
        });
      },
      delete: (item: { id: string }) => {
        hasId(item)
        mutate((state: any) => {
          const updatedArray = state[domain].filter((existingItem: any) => existingItem.id !== item.id);
          return { ...state, [domain]: updatedArray };
        });
      },
      list: () => {
        return Array(state[domain]);
      },
      search: (keyword: string) => {
        const lowercasedKeyword = keyword.toLowerCase();
        const itemsArray = state[domain];
    
        return Array(itemsArray).filter((item: any) => 
            JSON.stringify(item).toLowerCase().includes(lowercasedKeyword)
        );
    }
    };
  };
  
  /**
 * Creates a set of CRUD operations for a specific domain in the state.
 * 
 * @function
 * @param {string} domain - The domain/key in the state for which the CRUD operations are to be created.
 * 
 * @returns {Object} The CRUD operations:
 * 
 * @property {Function} create - Adds a new item to the domain.
 *  @param {Object} item - The item to be added.
 * 
 * @property {Function} read - Reads an item from the domain by its ID.
 *  @param {Object} item - The item containing the ID to be read.
 * 
 * @property {Function} update - Updates an item in the domain by its ID.
 *  @param {Object} item - The item containing the ID to be updated and the new values.
 * 
 * @property {Function} delete - Deletes an item from the domain by its ID.
 *  @param {Object} item - The item containing the ID to be deleted.
 * 
 * @property {Function} list - Lists all items in the domain.
 * 
 * @property {Function} search - Searches items in the domain by a keyword.
 *  @param {string} keyword - The keyword to search by.
 * 
 * @throws {Error} Throws an error if the domain in the state is not an object.
 */
  const createCRUDObject = (domain: keyof State<any>):TCRUDObjectOperations => {
    if (typeof state[domain] !== 'object') {
      throw new Error("Not an object");
    }

    return {
      create: (item: any) => {
        if(!item || typeof item !== 'object') {
          throw new Error("Item should be an object");
        }

        mutate((state: any) => {
          const id = uuidv1();
          return { ...state, [domain]: { ...state[domain], [id]: item } };
        });
      },
      read: (item: any) => {
        hasId(item)
        // @ts-ignore        
        return state?.[domain]?.[item.id];
      },
      update: (item: any) => {
        hasId(item)
        mutate((state: any) => {
          const existingItem = state[domain][item.id] || {};
          const updatedItem = { ...existingItem, ...item };
          return { ...state, [domain]: { ...state[domain], [item.id]: updatedItem } };
        });
      },
      delete: (item: { id: string }) => {
        hasId(item)
        mutate((state: any) => {
          const { [item.id]: _, ...updatedDomain } = state[domain];
          return { ...state, [domain]: updatedDomain };
        });
      },
       list: () => {
        return state[domain];
      },
      search: (keyword: string) => {
        const lowercasedKeyword = keyword.toLowerCase();
        const items = state[domain];
    
        const filteredEntries = Object.entries(items).filter(([key, value]) => 
            JSON.stringify(value).toLowerCase().includes(lowercasedKeyword)
        );
    
        return Object.fromEntries(filteredEntries);
    }
      
    };
}


  /**
   * Returns an object containing the current microstore state, the `getState`, `on`, and `emit` functions from the microstore instance,
   * and the `mutate` function for updating the state.
   *
   * @type {Object & State & EventHub} An object containing the current microstore state and related functions.
   */
  return {
    ...state,
    mutate,
    ...hub,
    subscribe,
    createCRUDObject,
    createCRUDArray
  };
};
