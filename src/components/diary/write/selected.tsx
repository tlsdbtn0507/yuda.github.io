import css from '../../../css/write.module.css'
import { diaryStore } from 'store/diary/diaryStore'
import { isEmptyObj } from 'utils/util';

const Selected = () => {

  const { isDiaryWritten } = diaryStore(state => state);

  return (
    <div className={css.selectedWrapper}>
      {isEmptyObj(isDiaryWritten.feeling) ? '' : 
        <p>asd</p>
      }
    </div>
  )
}

export default Selected