import React, { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generate, makeRandomMessage } from "../utils/helper";

const LiveChat = () => {
  const dispatch = useDispatch();

  const chatMessages = useSelector((store) => store.chat.messages);

  useEffect(() => {
    const i = setInterval(() => {
      //api polling
      console.log("sdfjadsj;fljasd;l");

      dispatch(
        addMessage({
          name: generate(),
          message: makeRandomMessage(25) + "🚀",
        })
      );
    }, 1500);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="pl-3 pt-2 w-full h-[500px] border-black border rounded-sm overflow-y-scroll flex flex-col-reverse">
      {chatMessages.map((chatMessage, index) => (
        <ChatMessage
          name={chatMessage.name}
          message={chatMessage.message}
          key={index}
        />
      ))}
    </div>
  );
};

export default LiveChat;
