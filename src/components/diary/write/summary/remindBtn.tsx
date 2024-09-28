import React from "react"
import css from '../../../../css/write.module.css'

interface WriteDiaryRemind {
}

const RemindBtn: React.FC<WriteDiaryRemind> = () => {

  return (
    <button className={css.remindBtn}>
      {'`${기분}`'}
    </button>
  )
}

export default RemindBtn