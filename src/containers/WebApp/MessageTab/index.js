import React from "react";
import ChatScreen from "../ChatScreen";

const MessageTab = ({ slot }) => {
  return (
    <div>
      {/* Additional components or logic can go here if needed */}
      <ChatScreen slot={slot} />
    </div>
  );
};

export default MessageTab;
