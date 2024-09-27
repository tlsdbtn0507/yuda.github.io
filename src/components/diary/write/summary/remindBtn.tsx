import React from "react"
import css from '../../../css/write.module.css'
import { diaryStore } from "store/diary/diaryStore"

interface WriteDiaryRemind{
  content:string
  title:string
}

const RemindBtn:React.FC<WriteDiaryRemind> = ({content,title}) => {

  const {isDiaryWritten} = diaryStore(state=>state)

  const moveToSelect = () => {
    console.log(isDiaryWritten);
  }

  return (
    <button className={css.remindBtn} onClick={moveToSelect}>
      {title === 'feeling' ? '하루' : '날씨' } : {content}
    </button>
  )
}

export default RemindBtn