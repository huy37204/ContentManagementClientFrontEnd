import { useEffect, useState } from "react";
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
  }, []);
  return (
    <div className="w-full min-w-[375px] overflow-auto">
      {/* Introduction Frame */}
      <IntroductionFrame />
      <ContentList contents={contents} />
    </div>
  );
};

export default HomePage;
