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
import { iBrainHub } from "../src/iBrainHub";

describe("iBrainHub", () => {
  test("should subscribe and emit events", () => {
    const hub = iBrainHub();
    const mockHandler = jest.fn();
    const eventPayload = { message: "Hello" };

    // Subscribe to an event
    hub.on("testEvent", mockHandler);

    // Emit the event
    hub.emit("testEvent", eventPayload);

    // Expect the handler to be called with the payload
    expect(mockHandler).toHaveBeenCalledWith({
      eventName: "testEvent",
      ...eventPayload,
    });
  });

  test("should remove event handlers", () => {
    const hub = iBrainHub();
    const mockHandler = jest.fn();
    const eventPayload = { message: "Hello" };

    // Subscribe to an event and get the remove function
    const removeHandler = hub.on("testEvent", mockHandler);
    // Remove the event handler
    removeHandler();

    // Emit the event
    hub.emit("testEvent", eventPayload);

    // Expect the handler not to be called
    expect(mockHandler).not.toHaveBeenCalled();
  });

  test("should handle emitting an event with no handlers", () => {
    const hub = iBrainHub();
    const eventPayload = { message: "Hello" };

    // Emit the event without any handlers
    hub.emit("testEvent", eventPayload);

    // Expect no errors to be thrown
    expect(true).toBe(true);
  });

  test("should handle subscribing without an event name or handler", () => {
    const hub = iBrainHub();

    // Subscribe without an event name or handler
    hub.on();

    // Expect no errors to be thrown
    expect(true).toBe(true);
  });
});
