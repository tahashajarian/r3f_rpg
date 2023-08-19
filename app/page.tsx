"use client";

import Login from "@/components/Login";
import MyScene from "@/components/Scene";
import ChatManagement from "@/components/chat/chat-managment";
import { useSelector } from "react-redux";

export default function Home() {
  const debugging = true;
  const user = useSelector((state: any) => state.user);

  return (
    <div>
      {user.isLogin ? (
        <div id="canvas-container" className="h-screen bg-black">
          <ChatManagement />
          <MyScene debugging={debugging} />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
