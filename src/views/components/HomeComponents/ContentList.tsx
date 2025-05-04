import { useNavigate } from "react-router-dom";
import { IContent } from "../../../interfaces/content";
import { format } from "date-fns";

interface ContentListProps {
  contents: IContent[] | null;
}

const ContentList: React.FC<ContentListProps> = ({ contents }) => {
  const navigate = useNavigate();
  const mediaClass =
    "w-[150px] lg:w-[200px] aspect-square object-cover rounded-2xl";

  return (
    <div className="w-full grid xl:grid-cols-2 gap-6 px-[2%] sm:px-[5%] py-4">
      {contents?.map((content) => {
        const mediaBlocks = content.blocks.filter(
          (b) => b.type === "image" || b.type === "video"
        );

        const firstThree = mediaBlocks.slice(0, 3);
        const remaining = mediaBlocks.length - 4;

        return (
          <div
            key={content._id}
            className="w-full flex items-center justify-between gap-4 p-4 rounded-2xl border border-black max-w-[1811px] mx-auto shadow-md hover:opacity-70 cursor-pointer trasition-all ease-in-out duration-300"
            onClick={() => {
              navigate(`contents/${content._id}`);
            }}
          >
            {/* Title & Info */}
            <div className="w-[60%]">
              <h1 className="text-[17px] sm:text-[30px] lg:text-[40px] font-bold">
                {content.title}
              </h1>
              <div className="flex flex-col">
                <span className="text-[#747474] text-[10px] sm:text-[14px]">
                  Created by {content.createdBy?.name || "Unknown"}
                </span>
                <span className="text-[#747474] text-[10px] sm:text-[14px]">
                  Updated at:{" "}
                  {(() => {
                    console.log("🧪 content.updatedAt:", content.updatedAt);

                    const parsed = new Date(content.updatedAt);
                    if (isNaN(parsed.getTime())) {
                      console.warn("❌ Invalid date detected:", content);
                      return "Invalid date";
                    }

                    return format(parsed, "HH:mm:ss a, dd/MM/yyyy");
                  })()}
                </span>
              </div>
            </div>

            {/* Image + Video preview thumbnails */}
            <div className="grid grid-cols-2 gap-4 w-[40%]">
              {firstThree.map((block, idx) =>
                block.type === "image" ? (
                  <img
                    key={idx}
                    className={mediaClass}
                    src={block.url || ""}
                    alt=""
                  />
                ) : (
                  <video
                    key={idx}
                    className={mediaClass}
                    src={block.url || ""}
                    muted
                    playsInline
                    preload="metadata"
                    onLoadedMetadata={(e) => {
                      (e.target as HTMLVideoElement).currentTime = 0.1;
                    }}
                  />
                )
              )}

              {mediaBlocks.length >= 4 ? (
                <div className="relative w-fit h-fit">
                  {mediaBlocks[3].type === "image" ? (
                    <img
                      className={mediaClass}
                      src={mediaBlocks[3].url || ""}
                      alt=""
                    />
                  ) : (
                    <video
                      className={mediaClass}
                      src={mediaBlocks[3].url || ""}
                      muted
                      playsInline
                      preload="metadata"
                      onLoadedMetadata={(e) => {
                        (e.target as HTMLVideoElement).currentTime = 0.1;
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-70 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
                    +{remaining + 1}
                  </div>
                </div>
              ) : (
                mediaBlocks.slice(3).map((block, idx) =>
                  block.type === "image" ? (
                    <img
                      key={`img-${idx + 3}`}
                      className={mediaClass}
                      src={block.url || ""}
                      alt=""
                    />
                  ) : (
                    <video
                      key={`vid-${idx + 3}`}
                      className={mediaClass}
                      src={block.url || ""}
                      muted
                      playsInline
                      preload="metadata"
                      onLoadedMetadata={(e) => {
                        (e.target as HTMLVideoElement).currentTime = 0.1;
                      }}
                    />
                  )
                )
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContentList;
