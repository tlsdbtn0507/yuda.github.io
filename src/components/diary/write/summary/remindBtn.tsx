import { diaryStore } from "store/diary/diaryStore"
import { WriteDiaryEnum } from "model/interfaces"

import React from "react"
import css from '../../../../css/write.module.css'
import UI from "constants/uiConstants"

interface WriteDiaryRemind {
  content: {
    title: string,
    type: string
  }
}

const RemindBtn: React.FC<WriteDiaryRemind> = ({ content }) => {

  const { isDiaryWritten, setWritingDiary } = diaryStore(state => state);

  const reCheckDiary = () => {
    switch (content.type) {
      case WriteDiaryEnum.Feeling:
        setWritingDiary({ ...isDiaryWritten, feeling: {} });
        break;
      case WriteDiaryEnum.Weather:
        setWritingDiary({ ...isDiaryWritten, weather: {} });
        break;
      case WriteDiaryEnum.FeelingReason:
        setWritingDiary({ ...isDiaryWritten, feelingReason: UI.EMPTY_STRING });
        break;

      default:
        break;
    }
  }

  return (
    <button className={css.remindBtn} onClick={reCheckDiary}>
      {content.title}
    </button>
  )
}

export default RemindBtn