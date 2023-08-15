import React, { useEffect, useState } from "react";
import MyInput from "../MyInput";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:8000");

type Props = {};

const ChatManagement = (props: Props) => {
  const [chats, setChats] = useState<{ sender: string; message: string }[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (inputValue.trim()) {
      chats.unshift({
        sender: "you",
        message: inputValue,
      });
      setChats([...chats]);
      setInputValue("");
      socket.emit("send_message", { message: inputValue, sender: username });
    }
  };
  const handleChangeInput = (e: any) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    socket.on("recive_message", (data: any) => {
      chats.unshift({
        sender: data.sender,
        message: data.message,
      });
      setChats([...chats]);
    });
  }, [socket]);

  const signup = (e: any) => {
    e.preventDefault();
    if (username) {
      socket.emit("login", username);
    }
    setIsLogin(true);
  };
  return (
    <div>
      {isLogin ? (
        <div className="fixed bg-white left-0 bottom-0 z-50 opacity-70 p-4 w-72 rounded-tr-md">
          <form onSubmit={handleSubmit}>
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
          <span
            className="text-xs cursor-pointer"
            onClick={() => {
              setIsLogin(false);
            }}
          >
            <span>&#9998;</span> chagne name
          </span>
        </div>
      ) : (
        <div className="fixed inset-0 bg-black z-50 h-screen w-screen flex justify-center items-center">
          <form className="w-72" onSubmit={signup}>
            <MyInput
              placeholder="Enter your name"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              additionalclasses="w-full text-center"
              maxLength={100}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatManagement;
