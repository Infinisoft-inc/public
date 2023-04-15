//
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
//
//
/**
 * iBrainHub - The event hub module for managing events and handlers.
 * Allows for subscribing to events, emitting events, and executing handlers.
 */

export const iBrainHub = () => {
  const events = new Map();
  /**
   * Subscribes to an event in the hub.
   * @param {string | RegExp} event - The name of the event to subscribe to (string or regular expression).
   * @param {function} handler - The callback function to be executed when the event is emitted.
   * @returns {function} A function to remove the handler from the subscribed event.
   */
  const on = (eventName, handler) => {
    const id = Symbol(handler);
    const handlers = events.get(eventName) ?? new Map();
    handlers.set(id, handler);
    events.set(eventName, handlers);
    return () => handlers.delete(id);
  };
  /**
   * Emits an event in the hub, triggering subscribed handlers.
   * @param {string} event - The name of the event to emit.
   * @param {Object} payload - The payload data to be passed to subscribed handlers.
   */
  const emit = (eventName, payload) => {
    const handlers = events.get(eventName);
    if (handlers) {
      handlers.forEach((handler) => handler(payload));
    }
  };
  return { on, emit };
};

