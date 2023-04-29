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
const uuidv1 = () => { let now = Date.now(); const mac = "xx:xx:xx:xx:xx:xx".replace(/x/g, () => (Math.random() * 16 | 0).toString(16)); return "xxxxxxxx-xxxx-1xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => { const r = (now + Math.random() * 16) % 16 | 0; now = Math.floor(now / 16); return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16); }).replace("yxxx", mac.slice(0, 4)).replace("xxxx", mac.slice(4)); };

export const iBrainHub = (options={source:"unknown", logger: console}) => {
  const events = new Map();
  const regexHandlers = new Map();
  const uuid = uuidv1()
  /**
   * Subscribes to an event in the hub.
   * @param {string | RegExp} event - The name of the event to subscribe to (string or regular expression).
   * @param {function} handler - The callback function to be executed when the event is emitted.
   * @returns {function} A function to remove the handler from the subscribed event.
   */
  const on = (eventName, handler) => {
    const handlerId = Symbol(handler);
    let handlers;

    if (typeof eventName === "string") {
      handlers = events.get(eventName) ?? new Map();
      handlers.set(handlerId, handler);
      events.set(eventName, handlers);
    } else if (eventName instanceof RegExp) {
      handlers = regexHandlers.get(eventName) ?? new Map();
      handlers.set(handlerId, handler);
      regexHandlers.set(eventName, handlers);
    } else {
      throw new Error("Invalid eventName");
    }

    return () => {
      handlers.delete(handlerId);
    };
  };
  /**
   * Emits an event in the hub, triggering subscribed handlers.
   * @param {string} event - The name of the event to emit.
   * @param {Object} payload - The payload data to be passed to subscribed handlers.
   */
  function emit(_eventName, payload = {}) {
    // Exit early no event duplication
    if (String(JSON.stringify(payload?.headers)).includes(uuid)) return;

    const eventName = _eventName;
    const handlers = events.get(eventName);

    handlers?.forEach((handler, id) => handler({ eventName, ...payload }));

    // Check for matching handlers for a regular expression
    regexHandlers.forEach((handlersForRegex, regex) => {
      if (regex.test(eventName)) {
        handlersForRegex.forEach((handler, id) => {
          const headers = payload?.headers ?? []
          headers.push({ uuid, timestamp: new Date().getTime() })
          const _payload = { ...payload, headers }
          return handler({ eventName, ..._payload })
        });
      }
    });
  }

  return { on, emit };
};
