import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Function to generate a unique session ID
const generateSessionId = () => {
  return `${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`;
};

const Chatbot = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [messages, setMessages] = useState([{ text: "Welcome to AI-Powered Q&A Agent. How can I assist you?", type: "assistant" }]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef(null);
  const sessionId = useRef(generateSessionId());
  const backendURL = "http://localhost:5000/api/query";

  // Initialize the chatbot and set up event listeners
  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      sendHeight();
      window.addEventListener("resize", sendHeight);
      return () => window.removeEventListener("resize", sendHeight);
    }
  }, [isInitialized]);

  // Update the height of the chatbot wrapper
  useEffect(() => {
    sendHeight();
    scrollToBottom();
  }, [messages]);

  // Function to send the height of the chatbot wrapper to the parent window
  const sendHeight = () => {
    const height = document.getElementById("chatbot-wrapper").offsetHeight;
    const width = document.getElementById("chatbot-wrapper").offsetWidth;
    if (window.top !== window.self) {
      window.parent.postMessage({ type: "resize", height, width }, "*");
    }
  };

  // Function to scroll to the bottom of the chat body
  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  // Function to send a message to the backend
  const sendMessage = async () => {
    if (isTyping || !userInput.trim()) return;

    const message = userInput.trim();
    setMessages([...messages, { text: message, type: "user" }]);
    setUserInput("");
    setIsTyping(true);

    try {
      const response = await fetch(backendURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: message, sessionId: sessionId.current }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setMessages([...messages, { text: message, type: "user" }, { text: data.reply, type: "assistant" }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([...messages, { text: message, type: "user" }, { text: "I'm sorry, I'm having trouble connecting right now. Please try again later.", type: "assistant" }]);
    } finally {
      setIsTyping(false);
      scrollToBottom(); // Ensure scroll to bottom after message is added
    }
  };

  // Handle the Enter key press to send a message
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div id="chatbot-wrapper" className="expanded">
      <div className="chat-container">
        <div className="chat-header">
          <span>AI-Powered Q&A Agent</span>
        </div>
        <div className="chat-body" ref={chatBodyRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              {msg.text}
            </div>
          ))}
          {isTyping && <div className="message typing">typing...</div>}
        </div>
        <div className="chat-footer">
          <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyDown={handleKeyPress} placeholder="Type your message..." />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<Chatbot />, document.getElementById("root"));
