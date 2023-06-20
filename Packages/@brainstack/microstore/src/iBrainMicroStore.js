//```
//
//      ..........
//   ...(%#%(*,......                                          ..
//  ..,%,.,,,,,*%*,.......                                 .........
//  ..*(,(,...,,*(*((,.......                            ....,,,,,....
//  ..,#,/.......,.,#*/(,.......                      ...,,/#*,,,,*(,.. .
//   .,#*(,....,,,,,.,,(**#,,.......               ....,#*,,,,,..,,%,....
//   ..,(/,..,(,,,,,#*,,,,(//#*,......        .....,*#*,,,*(/,(,.,,#,.. .
//   .../*(,,,(,,(((/,,/*,,,*#*/#*,..............,(*,,,#*.,,,,,(*,**,...
//    ..,#*/,,/,**,(((*#*,(,,,,*(,/#,,........,*#,,,/*,...,.,,*#**(,,...
//    ...,#**,,(,(*//(#//(**(*,,,,(**((,,.,.,(/,,,#,........,,%**%,,...
//     ...,%**,,(*#((#&%///(,,(*,,,,*(,*%**(*,,,/,.........,,%,*#,,...
//      ...,%*/,,/*//(##//*(**,,(,..,,,/,/((,.,/..........,,%,*#,....
//       ...,(*(,,*(*(*(##*/*,*,,(,...,*%*,,/#/,........,,#*,**,....
//        ...,*(/,,,*(,*/((,,,/,.,/,,,,(**(,,#((,.....,,%*,*%,....
//         ....,#*%,,,,(/,,,*%,..,(,,*#,..,(,*,,*#(###/,,,#*.....
//           ....*(*(,,..,,,,.....(,,%,...../#,.......,*%*.....
//             ...,*(,(,.........,*,(*,.......//,,,,/#*.....
//               ....*%*,//,,,,,#,,//....   .............
//                 ....,*%**,,.,,,%,...
//                     ....,,***,....
//                         . .
//
//
//"I never fail, I learned 10 000 ways that doesn't work!"
//                                    - Thomas Edison & Me
//
//            Infinisoft World Inc.
//            www.infinisoft.world
//            info@infinisoft.world
//            All rights reserved 2023
//```;

import {iBrainState} from "./iBrainState";
import {iBrainHub} from "./iBrainHub";

/**
 * iBrainMicroStore is a synchronous micro state management library
 * designed for use in micro frontends. It is one of the foundational elements of IBrain.
 *
 * @param {Object} initialState - The initial state of the store.
 * @param {Object} [options={ id: "microstore" }] - The options for the store.
 * @param {string} [options.id="microstore"] - The ID of the store.
 *
 * @returns {Object} The created micro store.
 * @returns {Function} .getState - Function to get the current state of the store.
 * @returns {Function} .mutate - Function to mutate the state of the store.
 * @returns {Function} .on - Function to add an event listener.
 * @returns {Function} .emit - Function to emit an event.
 * @returns {string} .id - The ID of the store.
 *
 * @example
 * const store = iBrainMicroStore({ count: 0 }, { id: "counterStore" });
 * store.mutate((state) => ({ count: state.count + 1 }));
 * console.log(store.getState()); // { count: 1 }
 */
export const iBrainMicroStore = (initialState,options={id:"microstore"}) => {
  const { getState, mutate } = iBrainState(initialState);
  const { on, emit } = iBrainHub();
  return { getState, mutate, on, emit, id: options.id };
};
