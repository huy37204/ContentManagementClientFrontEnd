import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import ContentList from "../components/HomeComponents/ContentList";
import IntroductionFrame from "../components/HomeComponents/IntroductionFrame";
import { IContent } from "../../interfaces/content";
import { findAllContent } from "../../services/Content/findAllContent";

const HomePage: React.FC = () => {
  const [contents, setContents] = useState<IContent[] | null>(null);

  const handleFindAllContent = async () => {
    const response = await findAllContent();
    if (!("error" in response)) {
      setContents(response.data);
    }
  };

  useEffect(() => {
    handleFindAllContent();

    const socket = io("http://localhost:3000", {
      transports: ["websocket"],
      path: "/socket.io",
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("new_content", (newContent: IContent) => {
      console.log("📦 Received new content via socket:", newContent);
      const parsedContent = {
        ...newContent,
        createdAt: new Date(newContent.createdAt),
        updatedAt: new Date(newContent.updatedAt),
      };
      setContents((prev) =>
        prev ? [parsedContent, ...prev] : [parsedContent]
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="w-full min-w-[375px] overflow-auto">
      <IntroductionFrame />
      <ContentList contents={contents} />
    </div>
  );
};

export default HomePage;
