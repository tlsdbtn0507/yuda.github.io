import { diaryStore } from "store/diary/diaryStore";

import Nav from "../components/nav/nav";
import Write from "../components/diary/write/write";
import css from "../css/main.module.css";
import HomePageWrapper from "components/homePageWrapper";

const HomePage: React.FC = () => {

  const { toggleWriteDairy, isWritingDairy, } = diaryStore((state) => state);

  return (
    <>
      <div className={`${css.total} ${isWritingDairy ? css.expand : css.home}`}>
        { isWritingDairy ? <Write /> : <HomePageWrapper/> }
      </div>
        { !isWritingDairy && <Nav onDiaryClick={() => toggleWriteDairy(true)} />}
    </>
  );
};

export default HomePage;
