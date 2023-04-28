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
//```

import { iBrainMicroStore } from "../dist/index.cjs.min.js"
// import {iBrainMicroStore} from "../src/iBrainMicroStore"

describe('iBrainMicroStore', () => {
  test('should integrate state and event modules', () => {
    const initialState = { count: 0 };
    const store = iBrainMicroStore(initialState);

    // Subscribe to an event and mutate state
    store.on('increment', (payload) => {
      const currentState = store.getState();
      store.mutate({ count: currentState.count + payload.amount });
    });

    // Emit the event
    store.emit('increment', { amount: 1 });

    // Expect state to be updated
    expect(store.getState()).toEqual({ count: 1 });
  });
  test('should trigger and mutate state successful', () => {
    const initialState = { count: 0 };
    const store = iBrainMicroStore(initialState);

    const regexPattern = /\.*/;

    store.on(regexPattern, (payload) => {
      const currentState = store.getState();
      store.mutate({ count: currentState.count + payload.amount });
    });

    // Emit the event
    store.emit('increment', { amount: 8 });

    // Expect state to be updated
    expect(store.getState()).toEqual({ count: 8 });
  });

  test('should not trigger and mutate state', () => {
    const initialState = { count: 0 };
    const store = iBrainMicroStore(initialState);

    // Subscribe to an event and mutate state
    store.on(/not/, (payload) => {
      const currentState = store.getState();
      store.mutate({ count: currentState.count + payload.amount });
    });

    // Emit the event
    store.emit('increment', { amount: 8 });

    // Expect state to be updated
    expect(store.getState()).toEqual({ count: 0 });
  });
});
