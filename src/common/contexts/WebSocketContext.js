import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { baseApiUrl } from "common/api/urlConfig";
import { useSelector } from "react-redux";

const WebSocketContext = createContext();

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [incomingMessage, setIncomingMessage] = useState(null);
  const authToken = useSelector((state) => state.auth.authToken);
  const { userData } = useSelector((state) => state.user);

  const [tone1, setTone1] = useState(null);
  const [tone2, setTone2] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTone1(new Audio("/assets/sounds/tone1.wav"));
      setTone2(new Audio("/assets/sounds/tone2.wav"));
    }
  }, []);

  const playToneForMessageType = useCallback(
    (messageType) => {
      if (!tone1 || !tone2) return;
      if (messageType === "provider") {
        tone1.play();
      } else if (messageType === "user") {
        tone2.play();
      }
    },
    [tone1, tone2]
  );

  const resetIncomingMessage = useCallback(() => {
    setIncomingMessage(null);
  }, []);

  const broadcastMessage = useCallback(
    (message) => {
      setIncomingMessage({ ...message, _timestamp: Date.now() });
      const lastMessage = Object.values(message.chatMessages).pop();
      if (lastMessage) {
        playToneForMessageType(lastMessage.messageType);
      }
    },
    [playToneForMessageType]
  );

  useEffect(() => {
    if (!authToken || !userData) {
      console.warn(
        "Missing authToken or userData, WebSocket connection will not be established."
      );
      return;
    }

  

    const stompClient = new Client({
      webSocketFactory: () =>
        new SockJS(`${baseApiUrl}/websocket`, null, {
          transports: ["websocket", "xhr-streaming", "xhr-polling"],
          withCredentials: true,
        }),
      connectHeaders: {
        "auth-token": authToken,
      },
      debug: function (str) {
        console.log("STOMP: " + str);
      },
      onConnect: () => {
    
        stompClient.subscribe(
          `/user/${userData.provider_id}/queue/private`,
          (message) => {
         
            const newMessage = JSON.parse(message.body);
            broadcastMessage(newMessage);
          }
        );
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame.headers["message"]);
        console.error("Additional error details:", frame);
      },
      onWebSocketError: (event) => {
        console.error("WebSocket error:", event);
      },
      onWebSocketClose: (event) => {
        console.log("WebSocket connection closed:", event);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
  
      if (stompClient.active) {
        stompClient.deactivate();
      }
    };
  }, [authToken, userData, broadcastMessage]);

  return (
    <WebSocketContext.Provider
      value={{ client, incomingMessage, resetIncomingMessage }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
