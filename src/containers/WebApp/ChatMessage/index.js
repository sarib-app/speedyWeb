// ChatMessage.js
import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import {
  ChatWindow,
  ChatHeader,
  MessageInputContainer,
  AttachmentIcon,
  MessageInput,
  SendButton,
} from "./chatmessage.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPlus } from "@fortawesome/free-solid-svg-icons";
import Profile from "common/assets/image/webApp/profile.svg";
import Image from "next/image";
import { useWebSocket } from "common/contexts/WebSocketContext";

const ChatMessage = ({ selectedChat, onUpdateMessages }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const { client } = useWebSocket();
  const [tone1, setTone1] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTone1(new Audio("/assets/sounds/tone1.wav"));
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat.chatMessages]);

  const formatTime = (timestamp) => {
    return moment(timestamp).format("h:mm A");
  };

  const sendMessage = () => {
    if (client && client.connected && currentMessage.trim()) {
      const newMessage = {
        messageId: uuidv4(),
        content: currentMessage.trim(),
        timestamp: moment().toISOString(),
        messageType: "provider", // Adjust according to your backend requirements
      };

      // Determine the next index for the new message
      const nextIndex = Object.keys(selectedChat.chatMessages).length;

      // Construct the complete chat message object
      const chatMessage = {
        chat_id: selectedChat.chat_id,
        user_id: selectedChat.user_id,
        username: selectedChat.username,
        business_id: selectedChat.business_id,
        business_name: selectedChat.business_name,
        project_name: selectedChat.project_name,
        chatMessages: {
          ...selectedChat.chatMessages,
          [nextIndex]: newMessage, // Add the new message with the next index
        },
      };

      // Publish the message to the WebSocket server
      client.publish({
        destination: `/user/${selectedChat.user_id}/queue/private`,
        body: JSON.stringify(chatMessage),
      });

      // Play tone1 when a message is sent
      if (tone1) {
        tone1.play();
      }

      // Update local state to immediately reflect the new message
      onUpdateMessages(selectedChat.chat_id, { chatMessages: [newMessage] });

      // Clear the input field
      setCurrentMessage("");
    }
  };

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderMessages = () => {
    return Object.values(selectedChat.chatMessages).map((message, index) => (
      <div
        key={index}
        className={`message ${
          message.messageType === "user" ? "receiver" : "sender"
        }`}
      >
        <div className="message-content">{message.content}</div>
        <div className="message-time">{formatTime(message.timestamp)}</div>
      </div>
    ));
  };

  return (
    <ChatWindow>
      <ChatHeader>
        <div className="profile-image">
          <Image loading="lazy" src={Profile} className="section-image" />
        </div>
        <div className="username">{selectedChat.username}</div>
      </ChatHeader>
      <div className="chat-messages">
        {renderMessages()}
        <div ref={chatEndRef} />
      </div>
      <MessageInputContainer>
        <AttachmentIcon onClick={() => {}}>
          <FontAwesomeIcon icon={faPlus} />
        </AttachmentIcon>
        <MessageInput
          placeholder="Type a message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <SendButton onClick={sendMessage}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </SendButton>
      </MessageInputContainer>
    </ChatWindow>
  );
};

export default ChatMessage;
