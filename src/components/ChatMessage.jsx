import React from "react";

const ChatMessage = ({ name, message }) => {
  return (
    <>
      <div className="flex items-center shadow-lg p-2">
        <img
          src="data:image/png;base64,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"
          alt=""
          className="w-9"
        />
        <span className="font-bold pl-2 shadow-sm">{name}</span>
        <span className="pl-2 shadow-sm">{message}</span>
      </div>
    </>
  );
};

export default ChatMessage;
