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

export const iBrainHub = (options) => {
  const events = new Map();
  const regexHandlers = new Map();
  const source = options?.source ?? "unknown";
  /**
   * Subscribes to an event in the hub.
   * @param {string | RegExp} event - The name of the event to subscribe to (string or regular expression).
   * @param {function} handler - The callback function to be executed when the event is emitted.
   * @returns {function} A function to remove the handler from the subscribed event.
   */
  const on = (eventName, handler) => {
    const id = Symbol(handler);
    let handlers;

    if (typeof eventName === "string") {
      handlers = events.get(eventName) ?? new Map();
      handlers.set(id, handler);
      events.set(eventName, handlers);
    } else if (eventName instanceof RegExp) {
      handlers = regexHandlers.get(eventName) ?? new Map();
      handlers.set(id, handler);
      regexHandlers.set(eventName, handlers);
    } else {
      throw new Error("Invalid eventName");
    }

    return () => {
      handlers.delete(id);
    };
  };
  /**
   * Emits an event in the hub, triggering subscribed handlers.
   * @param {string} event - The name of the event to emit.
   * @param {Object} payload - The payload data to be passed to subscribed handlers.
   */
  function emit(_eventName, payload = {}) {
    const eventName = `${source}.${_eventName}`;
    const handlers = events.get(eventName);

    handlers?.forEach((handler, id) => handler({ eventName, ...payload }));

    // Check for matching handlers for a regular expression
    regexHandlers.forEach((handlersForRegex, regex) => {
      if (regex.test(eventName)) {
        handlersForRegex.forEach((handler, id) =>
          handler({ eventName, ...payload })
        );
      }
    });
  }

  return { on, emit };
};
