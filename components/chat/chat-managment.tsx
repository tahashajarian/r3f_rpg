import React, { useEffect, useState } from "react";
import MyInput from "../MyInput";
import { io } from "socket.io-client";
import { useChatIo } from "./chat-socket";

type Props = {};

const ChatManagement = (props: Props) => {
  const { inputValue, handleChangeInput, chats, sendMessage, logOut } =
    useChatIo();

  return (
    <div>
      <div className="fixed bg-white left-0 bottom-0 z-50 opacity-70 p-4 w-72 rounded-tr-md">
        <form onSubmit={sendMessage}>
          <MyInput
            placeholder="Message..."
            value={inputValue}
            onChange={handleChangeInput}
            additionalclasses="w-full"
            maxLength={100}
          />
        </form>
        <div className="p-2 text-sm overflow-y-auto h-80">
          {chats.map((chat, index) => (
            <span className="block" key={index}>
              <span
                className={` ${
                  chat.sender === "you" ? "text-green-400" : "text-gray-400"
                }`}
              >
                {chat.sender}:{" "}
              </span>
              <span className="break-all">{chat.message}</span>
            </span>
          ))}
        </div>
        <span className="text-xs cursor-pointer" onClick={logOut}>
          <span>&#9998;</span> chagne name
        </span>
      </div>
    </div>
  );
};

export default ChatManagement;
