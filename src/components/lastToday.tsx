import { diaryStore } from '../store/diary/diaryStore'

import css from '../css/laTod.module.css'
import Diary from './diary/diary'
import NullDiary from './diary/nullDiary';
import APIS from 'constants/apiConstants';
import UI from 'constants/uiConstants';
import DiaryPreview from './diary/list/diaryPreview';
import TEST from 'constants/testConstants';

const { DATA: { FETCHING }, NUM_ZERO } = APIS;
const { TITLE } = UI.LastTodayTsx;
const { LAST_TODAY_MESSAGE } = UI.NullDiaryTsx;
const { DUMMI_DIARY_DATA } = TEST;
const LastToday = () => {

  const { diaries } = diaryStore(state => state);

  let content = <p>{FETCHING}</p>;

  if (diaries.length !== NUM_ZERO) {
    const lastDiary = diaries[NUM_ZERO];
    // content = <Diary diaryInfo={lastDiary} />
    content = <DiaryPreview diaryDetails={DUMMI_DIARY_DATA} />
  } else {
    content = <DiaryPreview diaryDetails={DUMMI_DIARY_DATA} />
    // content = <DiaryPreview/>
    // content = <NullDiary msg={LAST_TODAY_MESSAGE} />
  }

  return (
    <div className={css.total}>
      <h5 className={css.title}>{TITLE}</h5>
      {content}
    </div>
  )
}

export default LastToday