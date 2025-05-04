import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { format, isValid } from "date-fns";
import { io } from "socket.io-client";

import { IContent } from "../../interfaces/content";
import { IBlock } from "../../interfaces/block";
import { findContentById } from "../../services/Content/findContentById";

import Modal from "../components/Modal";

const getResponsiveColCount = (width: number): number => {
  if (width < 640) return 1;
  if (width < 768) return 2;
  if (width < 1024) return 3;
  if (width < 1280) return 4;
  return 5;
};

const formatDate = (date: Date | string | null): string =>
  isValid(date as Date)
    ? format(new Date(date!), "hh:mm:ss a, dd/MM/yyyy")
    : "Invalid date";

const ContentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<IContent | null>(null);
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number | null>(
    null
  );
  const [selectedHeadingIndex, setSelectedHeadingIndex] = useState<
    number | null
  >(null);
  const [colCount, setColCount] = useState<number>(
    getResponsiveColCount(window.innerWidth)
  );

  const handleFetchContent = useCallback(async () => {
    if (!id) return;
    const res = await findContentById(id);
    if ("data" in res) {
      const parsed = {
        ...res.data,
        createdAt: new Date(res.data.createdAt),
        updatedAt: new Date(res.data.updatedAt),
      };
      setContent(parsed);
    }
  }, [id]);

  useEffect(() => {
    handleFetchContent();

    const socket = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ["websocket"],
      path: "/socket.io",
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("new_content", (newContent: IContent) => {
      if (newContent._id === id) {
        setContent({
          ...newContent,
          createdAt: new Date(newContent.createdAt),
          updatedAt: new Date(newContent.updatedAt),
        });
      }
    });

    socket.on("hide_content", (payload: { id: string }) => {
      if (payload.id === id) {
        setContent(null);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [id, handleFetchContent]);

  useEffect(() => {
    const handleResize = () => {
      setColCount(getResponsiveColCount(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columns = useMemo(() => {
    if (!content) return [];
    const cols: { block: IBlock; realIndex: number }[][] = Array.from(
      { length: colCount },
      () => []
    );
    content.blocks.forEach((block, i) => {
      cols[i % colCount].push({ block, realIndex: i });
    });
    return cols;
  }, [content, colCount]);

  if (!content) return null;

  return (
    <div className="w-full min-w-[375px] px-6 sm:px-8 md:px-12 lg:px-16">
      <div className="w-full mt-10">
        <h1 className="font-bold text-[40px] sm:text-[50px] text-center mb-4">
          {content.title}
        </h1>
        <div className="text-gray-600 text-center mb-8">
          <p>🧑‍💻 Created by: {content.createdBy?.name || "Unknown"}</p>
          <p>🕒 Created at: {formatDate(content.createdAt)}</p>
          <p>✏️ Updated by: {content.updatedBy?.name || "Unknown"}</p>
          <p>🕒 Updated at: {formatDate(content.updatedAt)}</p>
        </div>
        <hr className="h-1 bg-[#FD7A7E] mb-4 flex mx-auto w-[50%]" />

        <div className="flex gap-4">
          {columns.map((blocks, colIdx) => (
            <div key={colIdx} className="flex flex-col w-full">
              {blocks.map(({ block, realIndex }) => (
                <div
                  key={realIndex}
                  className="mb-4 break-inside-avoid rounded-xl overflow-hidden bg-white shadow"
                >
                  {block.type === "image" && (
                    <img
                      src={block.url!}
                      className="w-full h-auto object-cover"
                    />
                  )}
                  {block.type === "video" && (
                    <video
                      src={block.url!}
                      controls
                      className="w-full h-auto"
                    />
                  )}
                  {block.type === "text" && (
                    <div className="p-3 border rounded">
                      <h2 className="font-bold text-center mb-2">Text</h2>
                      {block.headings?.map((h, i) => (
                        <div
                          key={i}
                          className="bg-gray-100 text-sm text-center p-2 my-1 rounded cursor-pointer hover:bg-gray-200"
                          onClick={() => {
                            setSelectedBlockIndex(realIndex);
                            setSelectedHeadingIndex(i);
                          }}
                        >
                          {h}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Modal for paragraph preview */}
      <Modal
        isOpen={selectedBlockIndex !== null && selectedHeadingIndex !== null}
        onClose={() => {
          setSelectedBlockIndex(null);
          setSelectedHeadingIndex(null);
        }}
      >
        {selectedBlockIndex !== null &&
          selectedHeadingIndex !== null &&
          content.blocks[selectedBlockIndex].type === "text" && (
            <div>
              <h2 className="text-xl font-bold mb-2 text-center">
                {
                  content.blocks[selectedBlockIndex].headings?.[
                    selectedHeadingIndex
                  ]
                }
              </h2>
              <p className="text-gray-700 whitespace-pre-line text-justify">
                {
                  content.blocks[selectedBlockIndex].paragraphs?.[
                    selectedHeadingIndex
                  ]
                }
              </p>
            </div>
          )}
      </Modal>
    </div>
  );
};

export default ContentDetailPage;
