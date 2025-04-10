import { diaryStore } from '../store/diary/diaryStore'

import css from '../css/laTod.module.css'
import NullDiary from './diary/nullDiary';
import APIS from 'constants/apiConstants';
import UI from 'constants/uiConstants';
import DiaryPreview from './diary/list/diaryPreview';

const { DATA: { FETCHING }, NUM_ZERO } = APIS;
const { TITLE } = UI.LastTodayTsx;
const { LAST_TODAY_MESSAGE } = UI.NullDiaryTsx;

const LastToday = () => {

  const { diaries } = diaryStore(state => state);

  let content = <p>{FETCHING}</p>;

  if (diaries.length !== NUM_ZERO) {
    const lastDiary = diaries[NUM_ZERO];
    content = <DiaryPreview diaryDetails={lastDiary} />
  } else {
    content = <NullDiary msg={LAST_TODAY_MESSAGE} />
  }

  return (
    <div className={css.total}>
      <h5 className={css.title}>{TITLE}</h5>
      {content}
    </div>
  )
}

export default LastToday