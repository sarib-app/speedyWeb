import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import {
  ChatLayout,
  ContactList,
  Contact,
  SearchInput,
  ChatWindow,
} from "./chatscreen.style";
import { fetchChatHistory } from "common/api/api";
import ChatMessage from "../ChatMessage"; // Ensure this is the correct path
import { useSelector } from "react-redux";
import Image from "next/image";
import Profile from "common/assets/image/webApp/profile.svg";
import { v4 as uuidv4 } from "uuid";
import { useWebSocket } from "common/contexts/WebSocketContext";

const ChatScreen = ({ slot }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState({});
  const authToken = useSelector((state) => state.auth.authToken);
  const { userData } = useSelector((state) => state.user);
  const businessId = userData.provider_id;
  const { incomingMessage, resetIncomingMessage } = useWebSocket();

  const fetchHistory = useCallback(async () => {
    const chatInfo = {
      business_id: slot ? slot.business_id : userData.provider_id,
      user_id: slot ? slot.user_id : null,
      username: slot ? slot.username : null,
      business_name: slot ? slot.business_name : null,
    };

    try {
      const chatHistoryResponse = await fetchChatHistory(chatInfo, authToken);
      if (chatHistoryResponse?.data.payload) {
        const formattedChats = chatHistoryResponse.data.payload.map((chat) => ({
          ...chat,
          chatMessages: Object.values(chat.chatMessages || {}),
        }));
        setMessages(formattedChats);

        const currentChat = formattedChats.find(
          (chat) => chat.username.toLowerCase() === slot?.username.toLowerCase()
        );

        if (!currentChat && slot) {
          const newChat = {
            chat_id: uuidv4(),
            username: slot.username,
            user_id: slot.user_id,
            business_id: slot.business_id,
            business_name: slot.business_name,
            selectedServiceType:
              slot &&
              slot.selectedServiceTypes &&
              slot.selectedServiceTypes.length > 0
                ? slot.selectedServiceTypes[0]
                : null,
            chatMessages: [],
          };
          setSelectedChat(newChat);
          setMessages((prevMessages) => [...prevMessages, newChat]);
        } else {
          setSelectedChat(currentChat);
        }
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  }, [slot, authToken, userData.provider_id]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  useEffect(() => {
    if (
      incomingMessage &&
      selectedChat &&
      incomingMessage.business_id === selectedChat.business_id
    ) {
      onUpdateMessages(selectedChat.chat_id, incomingMessage);
      resetIncomingMessage();
    }
  }, [incomingMessage, selectedChat, resetIncomingMessage]);

  const handleChatSelection = (chat) => {
    setSelectedChat(chat);
    if (unreadMessages[chat.chat_id]) {
      // Mark messages as read when chat is selected
      setUnreadMessages((prev) => ({
        ...prev,
        [chat.chat_id]: 0,
      }));
    }
  };

  const onUpdateMessages = (chatId, newMessageObject) => {
    setMessages((prevMessages) => {
      let updatedSelectedChat = null;

      const updatedMessages = prevMessages.map((chat) => {
        if (chat.chat_id === chatId) {
          const updatedChatMessages = newMessageObject.chatMessages
            ? [
                ...chat.chatMessages,
                ...Object.values(newMessageObject.chatMessages).filter(
                  (msg) =>
                    !chat.chatMessages.some(
                      (cm) => cm.messageId === msg.messageId
                    )
                ),
              ]
            : chat.chatMessages;

          if (selectedChat && selectedChat.chat_id === chatId) {
            updatedSelectedChat = {
              ...chat,
              chatMessages: updatedChatMessages,
            };
          }

          // Increment unread message count for the chat
          if (newMessageObject.chatMessages) {
            setUnreadMessages((prev) => ({
              ...prev,
              [chatId]:
                (prev[chatId] || 0) + newMessageObject.chatMessages.length,
            }));
          }

          return { ...chat, chatMessages: updatedChatMessages };
        } else {
          return chat;
        }
      });

      if (updatedSelectedChat) {
        setSelectedChat(updatedSelectedChat);
      }

      return updatedMessages;
    });
  };

  const renderChatList = () => {
    return messages.map((chat, index) => {
      const chatMessagesArray = Object.values(chat.chatMessages || {});
      const lastMessage = chatMessagesArray[chatMessagesArray.length - 1];
      const formattedDate = lastMessage
        ? moment(lastMessage.timestamp).format("MM/DD")
        : "";
      const unreadCount = unreadMessages[chat.chat_id] || 0;

      return (
        <Contact key={index} onClick={() => handleChatSelection(chat)}>
          <div className="profile-image">
            <Image loading="lazy" src={Profile} className="section-image" />
          </div>
          <div className="contact-content">
            <span>{chat.username}</span>
            <p>{lastMessage ? lastMessage.content : "No message"}</p>
            {unreadCount > 0 && <span>Unread: {unreadCount}</span>}
          </div>
          <small>{formattedDate}</small>
        </Contact>
      );
    });
  };

  return (
    <ChatLayout>
      <ContactList>
        <SearchInput
          placeholder="Search messages"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {renderChatList()}
      </ContactList>
      <ChatWindow>
        {selectedChat && (
          <ChatMessage
            key={selectedChat.chatMessages.length}
            selectedChat={selectedChat}
            onUpdateMessages={onUpdateMessages}
          />
        )}
      </ChatWindow>
    </ChatLayout>
  );
};

export default ChatScreen;
