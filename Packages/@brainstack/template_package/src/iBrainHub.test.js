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
});

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

  test("should handle subscribing with a regular expression", () => {
    const hub = iBrainHub();
    const mockHandler = jest.fn();
    const eventPayload = { message: "Hello" };
  
    // Subscribe to events that match a regular expression
    hub.on(/test\..*/, mockHandler);
  
    // Emit an event that matches the regular expression
    hub.emit("test.Event", eventPayload);
  
    // Expect the handler to be called with the payload
    expect(mockHandler).toHaveBeenCalledWith({
      eventName: "test.Event",
      ...eventPayload,
    });
  
    // Emit an event that does not match the regular expression
    hub.emit("otherEvent", eventPayload);
  
    // Expect the handler not to be called
    expect(mockHandler).not.toHaveBeenCalledWith({
      eventName: "otherEvent",
      ...eventPayload,
    });
  });

  test("should handle subscribing with an invalid eventName", () => {
    const hub = iBrainHub();

    // Subscribe with an invalid eventName
    expect(() => {
      hub.on(123, () => {});
    }).toThrow("Invalid eventName");
  });

  test("should remove event when last handler is deleted", () => {
    const hub = iBrainHub();
    const mockHandler1 = jest.fn();
    const mockHandler2 = jest.fn();
    const eventPayload = { message: "Hello" };

    // Subscribe to an event with two handlers
    const removeHandler1 = hub.on("testEvent", mockHandler1);
    const removeHandler2 = hub.on("testEvent", mockHandler2);

    // Remove one of the handlers
    removeHandler1();

    // Emit the event
    hub.emit("testEvent", eventPayload);

    // Expect the first handler not to be called and the second handler to be called with the payload
    expect(mockHandler1).not.toHaveBeenCalled();
    expect(mockHandler2).toHaveBeenCalledWith({
      eventName: "testEvent",
      ...eventPayload,
    });

    // Remove the second handler
    removeHandler2();

    // Emit the event
    hub.emit("testEvent", eventPayload);

    // Expect no handlers to be called
    expect(mockHandler1).not.toHaveBeenCalled();
    expect(mockHandler2).toHaveBeenCalled();
  });

  test("should handle removing non-existent event handlers", () => {
    const hub = iBrainHub();

    // Try to remove a non-existent event handler
    expect(() => {
      const removeHandler = hub.on("testEvent", () => {});
      removeHandler();
      removeHandler();
    }).not.toThrow();
  });
});
