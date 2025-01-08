import { diaryStore } from 'store/diary/diaryStore';
import { DiaryToSendToSurver, IsDiaryWritten, } from 'model/interfaces';
import { dayMakerToSend, whichDayIsitToday } from 'utils/util';

import css from '../../../../css/write.module.css'
import { userStore } from 'store/user/userStore';
import SelectedMakeBtns from './selectedMakeBtns';

const Selected = () => {

  const { isDiaryWritten } = diaryStore(state => state);
  const { currentLoc } = userStore(state => state);

  const submitDiary = () => {
    const diaryToSendToSurver: DiaryToSendToSurver = {
      ...isDiaryWritten as Required<IsDiaryWritten>,
      ...currentLoc,
      diaryDate: dayMakerToSend(),
      dayOfWeek: whichDayIsitToday()
    };
    console.log(diaryToSendToSurver)
  };

  return (
    <div className={css.selected}>
      <SelectedMakeBtns />
      <button className={css.sumDoneBtn} onClick={submitDiary}>끝내기!</button>
    </div>
  )
}

export default Selected