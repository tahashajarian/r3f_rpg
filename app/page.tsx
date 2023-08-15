"use client";

import MyScene from "@/components/Scene";
import ChatManagement from "@/components/chat/chat-managment";
import { useEffect, useState } from "react";

export default function Home() {
  const debugging = true;
  const [playerName, setPlayerName] = useState<string>("");
  useEffect(() => {
    fetch("http://localhost:8000/userinfo")
      .then((response) => response.text())
      .then((response) => {
        setPlayerName(response);
      });
  }, []);

  return (
    <div id="canvas-container" className="h-screen bg-black">
      <ChatManagement />
      <MyScene
        playerInfo={{
          playerName,
        }}
        debugging={debugging}
      />
    </div>
  );
}
