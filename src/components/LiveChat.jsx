import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generate, makeRandomMessage } from "../utils/helper";

const LiveChat = () => {
  const [liveMessage, setliveMessage] = useState("");
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
    <>
      <div className="pl-3 pt-2 w-full h-[500px] border-black border rounded-sm overflow-y-scroll flex flex-col-reverse">
        {chatMessages.map((chatMessage, index) => (
          <ChatMessage
            name={chatMessage.name}
            message={chatMessage.message}
            key={index}
          />
        ))}
      </div>
      <form
        action=""
        className="flex"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            addMessage({
              name: "Suresh Alabani",
              message: liveMessage,
            })
          );
          setliveMessage("");
        }}
      >
        <input
          type="text"
          placeholder="enter something."
          value={liveMessage}
          onChange={(e) => setliveMessage(e.target.value)}
          className="border border-black px-2 py-1 mt-1 w-full"
        />
        <button type="submit" className="px-2 bg-green-100 rounded-md">
          Send
        </button>
      </form>
    </>
  );
};

export default LiveChat;
