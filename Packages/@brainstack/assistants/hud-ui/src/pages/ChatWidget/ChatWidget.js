import React, { useState, useRef, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useChat } from "./useChat";

const ChatWidget = () => {
  const [inputMessage, setInputMessage] = useState("");
  const containerRef = useRef(null);
  const { messages, sendMessage } = useChat();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage(inputMessage);
      setInputMessage("");
    }
  };

  return (
      <div className="card d-flex flex-column" style={{ height: "100%" }}>
        <div className="card-header bg-none fw-bold d-flex align-items-center">
          Ibrain dicussion
        </div>
        <div
          className="card-body flex-grow-1 d-flex flex-column p-0"
          style={{ maxHeight: "calc(100% - 100px)" }}
        >
          <PerfectScrollbar
            className="flex-grow-1 p-3"
            containerRef={(ref) => {
              containerRef.current = ref;
            }}
          >
            <div className="widget-chat">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`widget-chat-item ${
                    message.sender === "system" ? "reply" : ""
                  }`}
                >
                  {message.sender === "user" && (
                    <div className="widget-chat-media">
                      <img src="/assets/img/user/user-2.jpg" alt="" />
                    </div>
                  )}
                  <div className="widget-chat-content">
                    {message.sender === "user" && (
                      <div className="widget-chat-name">User</div>
                    )}
                    <div className="widget-chat-message last">
                      {message.content}
                    </div>
                    {message.sender === "system" && (
                      <div className="widget-chat-status">
                        <b>Read</b> 16:26
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </PerfectScrollbar>
        </div>
        <div className="card-footer bg-none">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="btn btn-outline-default"
              type="button"
              onClick={sendMessage}
            >
              <i className="fa fa-paper-plane text-muted"></i>
            </button>
          </div>
        </div>
      </div>
  );
};

export default ChatWidget;
