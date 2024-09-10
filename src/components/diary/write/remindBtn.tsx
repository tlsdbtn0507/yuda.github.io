import { WriteDiaryFeeling } from "model/interfaces"
import React from "react"
import css from '../../../css/write.module.css'

interface WriteDiaryRemind{
  type:WriteDiaryFeeling
}

const RemindBtn:React.FC<WriteDiaryRemind> = ({type}) => {

  console.log(type)

  return (
    <button className={css.remindBtn}>
      {type.ment}
    </button>
  )
}

export default RemindBtn