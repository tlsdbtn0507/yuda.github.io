import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import css from '../../css/write.module.css'
import { diaryStore } from "store/diary/diaryStore"

const CloseBtn = () => {

  const { toggleWriteDairy } = diaryStore(state => state);

  return (
    <button className={css.closeBtn} onClick={() => toggleWriteDairy(false)}>
      <FontAwesomeIcon className={css.closeBtnIcon} icon={faXmark}/>
    </button>
  )
}

export default CloseBtn