// useChat.js

import { useState, useEffect } from "react";
import ChatService from "./ChatService";

export const useChat = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = async (inputMessage) => {
    if (inputMessage.trim() !== "") {
      addMessage({ sender: "user", content: inputMessage });
      const response = await ChatService.sendMessage(inputMessage);
      addMessage(response);
    }
  };

  return { messages, sendMessage };
};
