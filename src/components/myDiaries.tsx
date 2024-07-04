import { useRef, useState } from "react";
import Diary from "./diary/diary";

import css from '../css/diaryList.module.css'
import { diaryStore } from "../store/diary/diaryStore";
import NullDiary from "./diary/nullDiary";
import LoadingSpin from "./util/loadingSpin";

const MyDiaries = () => {
  const [moreDiv, setMoreDiv] = useState(true);
  const [count, setCount] = useState(0);

  const { diaries ,getMoreDiaries } = diaryStore(state => state);

  const currentScroll = useRef<HTMLInputElement>(null);
  const moreScroll = useRef<HTMLInputElement>(null);

  let content

  if (diaries) content = diaries.map(e => <Diary key={e.id} diaryInfo={e} />);

  if (diaries.length === 0) content = <NullDiary msg="아직 작성한 일기가" />;

  const getMoreHandler = async (id: number) => {
    if (count === 20) {
      const more = await getMoreDiaries(id);
      setTimeout(() => {
        setCount(0);
        setMoreDiv(more)
      }, 1);
    }
  }

  const addMoreDiaries = () => {
    const scrollContainer = currentScroll.current;
    if (diaries.length < 5) return;
    if ( scrollContainer) {
      const { scrollHeight, clientHeight, scrollTop } = scrollContainer;
      if (scrollHeight <= clientHeight + scrollTop) {
        setCount(prev => prev += 1)
        getMoreHandler(diaries[diaries.length-1].id)
      }
    }
  }

  return (
  <>
    <h5 className={css.h5}>나의 일기들</h5>
    <div className={css.wrapper} ref={currentScroll} onScroll={addMoreDiaries}>
      <div className={css.list} >
          {content}
          {diaries.length !== 0 &&
          <div className={css.more} ref={moreScroll}>
            { (moreDiv && diaries.length ===5) && <LoadingSpin/>}
          </div>}
      </div>
    </div>
  </>
  )
}

export default MyDiaries