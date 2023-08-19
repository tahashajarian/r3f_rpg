import { setLogin } from "@/redux/userSlice";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export const useChatIo = () => {
  const dispatch = useDispatch();
  const [chats, setChats] = useState<{ sender: string; message: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const socket = useSelector((state: any) => state.io.socket);
  const user = useSelector((state: any) => state.user);
  const sendMessage = (e: any) => {
    e.preventDefault();
    if (inputValue.trim()) {
      chats.unshift({
        sender: "you",
        message: inputValue,
      });
      setChats([...chats]);
      setInputValue("");
      socket.emit("send_message", { message: inputValue, sender: user.name });
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

  const logOut = () => {
    dispatch(setLogin(false));
  };

  return { inputValue, handleChangeInput, sendMessage, chats, logOut };
};
