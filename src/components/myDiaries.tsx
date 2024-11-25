import { useRef, useState } from "react";
import { diaryStore } from "../store/diary/diaryStore";

import Diary from "./diary/diary";
import css from '../css/diaryList.module.css'
import NullDiary from "./diary/nullDiary";
import LoadingSpin from "./util/loadingSpin";
import UI from "constants/uiConstants";
import APIS from "constants/apiConstants";

const { NO_DIARY_YET } = UI.NullDiaryTsx;
const { H5_TITLE, DIARY_LENGTH, SCROLL_COUNT } = UI.MyDiariesTsx;

const MyDiaries = () => {
  const [moreDiv, setMoreDiv] = useState(true);
  const [count, setCount] = useState(0);

  const { diaries, getMoreDiaries } = diaryStore(state => state);

  const currentScroll = useRef<HTMLInputElement>(null);
  const moreScroll = useRef<HTMLInputElement>(null);

  let content

  if (diaries) content = diaries.map(e => <Diary key={e.id} diaryInfo={e} />);

  if (diaries.length === APIS.NUM_ZERO) content = <NullDiary msg={NO_DIARY_YET} />;

  const getMoreHandler = async (id: number) => {
    if (count === SCROLL_COUNT) {
      const more = await getMoreDiaries(id);
      setTimeout(() => {
        setCount(0);
        setMoreDiv(more)
      }, 1);
    }
  }

  const addMoreDiaries = () => {
    const scrollContainer = currentScroll.current;
    if (diaries.length < DIARY_LENGTH) return;
    if (scrollContainer) {
      const { scrollHeight, clientHeight, scrollTop } = scrollContainer;
      if (scrollHeight <= clientHeight + scrollTop) {
        setCount(prev => prev += 1)
        getMoreHandler(diaries[diaries.length - 1].id)
      }
    }
  }

  return (
    <>
      <h5 className={css.h5}>{H5_TITLE}</h5>
      <div className={css.wrapper} ref={currentScroll} onScroll={addMoreDiaries}>
        <div className={css.list} >
          {content}
          {diaries.length !== APIS.NUM_ZERO &&
            <div className={css.more} ref={moreScroll}>
              {(moreDiv && diaries.length === DIARY_LENGTH) && <LoadingSpin />}
            </div>}
        </div>
      </div>
    </>
  )
}

export default MyDiaries