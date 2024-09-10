import css from '../../../css/write.module.css'
import { diaryStore } from 'store/diary/diaryStore'
import { isEmptyObj } from 'utils/util';
import RemindBtn from './remindBtn';
import { WriteDiaryFeeling, WriteDiaryWeather } from 'model/interfaces';

const Selected = () => {

  const { isDiaryWritten } = diaryStore(state => state);

  const isBtnOpacity = (toCheck: WriteDiaryFeeling | WriteDiaryWeather) =>
    !isEmptyObj(toCheck);

  return (
    <div className={css.selectedWrapper}>
      <div style={{opacity:+isBtnOpacity(isDiaryWritten.feeling as WriteDiaryFeeling)}}>
        <RemindBtn type={isDiaryWritten.feeling as WriteDiaryFeeling} />
      </div>
      <div style={{opacity:+isBtnOpacity(isDiaryWritten.weather as WriteDiaryFeeling)}}>
        <RemindBtn type={isDiaryWritten.weather as WriteDiaryFeeling} />
      </div>
    </div>
  )
}

export default Selected