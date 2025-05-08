import { useEffect } from "react";
import { io } from "socket.io-client";
import { IContent } from "../interfaces/content";

export const useContentSocket = (onNewContent: (content: IContent) => void) => {
  useEffect(() => {
    const socket = io("http://http://huytran3.workspace.opstech.org:8080", {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("✅ Connected to socket:", socket.id);
    });

    socket.on("new_content", (content: IContent) => {
      console.log("📦 Received new content via socket:", content);
      onNewContent(content);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};
