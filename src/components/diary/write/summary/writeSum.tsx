import { whichObjIsEmpty } from 'utils/util'
import css from '../../../../css/write.module.css'
import Selected from './selected'
import { diaryStore } from 'store/diary/diaryStore'

const WriteSum = () => {

  const { isDiaryWritten } = diaryStore(state => state);

  return (
    <div className={css.writeSumWrap}>
      <h2>오늘 하루의</h2>
      {whichObjIsEmpty(isDiaryWritten) === 'done' && <Selected />}
    </div>
  )
}

export default WriteSum