import React, { useEffect, useRef, useState } from "react";
import { diaryStore } from "../store/diary/diaryStore";

import css from '../css/diaryList.module.css'
import NullDiary from "./diary/nullDiary";
import LoadingSpin from "./util/loadingSpin";
import UI from "constants/uiConstants";
import APIS from "constants/apiConstants";
import DiaryPreview from "./diary/list/diaryPreview";

const { NO_DIARY_YET } = UI.NullDiaryTsx;
const { H5_TITLE, DIARY_LENGTH, SCROLL_COUNT } = UI.MyDiariesTsx;

const MyDiaries = () => {
  const [moreDiv, setMoreDiv] = useState(true);
  const [count, setCount] = useState(0);
  const [listHeight, setListHeight] = useState(0);
  const [diaryPreviewHeight, setDiaryPreviewHeight] = useState('30%');

  const { diaries, getMoreDiaries } = diaryStore(state => state);

  const currentScroll = useRef<HTMLInputElement>(null);
  const moreScroll = useRef<HTMLInputElement>(null);
  const diaryListRef = useRef<HTMLInputElement>(null);


  const getMoreHandler = async (id: number) => {
    if (count === SCROLL_COUNT) {
      const more = await getMoreDiaries(id);
      setTimeout(() => {
        setCount(0);
        setMoreDiv(more);
      }, 1);
    }
  }

  const addMoreDiaries = () => {
    const scrollContainer = currentScroll.current;
    if (diaries.length < DIARY_LENGTH) return;
    if (scrollContainer) {
      const { scrollHeight, clientHeight, scrollTop } = scrollContainer;
      if (scrollHeight <= clientHeight + scrollTop) {
        setCount(prev => prev += 1);
        getMoreHandler(diaries[diaries.length - 1].id);
      }
    }
  };

  const previewHightHandler = (listHeight: number) => {
    const heightStandard = Math.floor(window.innerHeight / 10);
    
    if (heightStandard >= 85) {
      currentScroll.current!.style.height = '36vh';
      return setDiaryPreviewHeight('30%');
    }
    if (heightStandard < 75 && heightStandard > 65) {
      currentScroll.current!.style.height = '30vh';
      return setDiaryPreviewHeight('40%');
    }
    if (heightStandard < 65 && heightStandard > 0 ) {
      currentScroll.current!.style.height = '14vh';
      return setDiaryPreviewHeight('5rem');
    }

  }

  useEffect(() => {
    if (!diaryListRef.current) return;
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { height } = entry.contentRect;
        setListHeight(height);
      }
    });
    observer.observe(diaryListRef.current);

    return () => observer.disconnect();
  }, [diaryListRef]);

  useEffect(() => {
    previewHightHandler(listHeight);
  },[listHeight])

  const contentMaker = () => {
    const previewHeight = { "--preview-height": `${diaryPreviewHeight}` } as React.CSSProperties;
    if (diaries) {
      if (diaries.length === APIS.NUM_ZERO)
        return <NullDiary msg={NO_DIARY_YET} />;
      return diaries.map(e => <DiaryPreview style={previewHeight} key={e.id} diaryDetails={e} />);
    }
  }

  return (
    <>
      <h5 className={css.h5}>{H5_TITLE}</h5>
      <div className={css.wrapper} ref={currentScroll} onScroll={addMoreDiaries}>
        <div className={css.list} ref={diaryListRef}>
          {contentMaker()}
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