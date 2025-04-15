import { useMutation } from '@tanstack/react-query';
import { sendTodayForLastDiary } from 'api/diary/diaryApi';
import { datesForStringMaker } from 'utils/util';
import { DiaryCameFromServer } from 'model/interfaces';
import { useEffect } from 'react';
import { renewToken } from 'api/users/usersApi';

import css from '../css/laTod.module.css'
import NullDiary from './diary/nullDiary';
import UI from 'constants/uiConstants';
import DiaryPreview from './diary/list/diaryPreview';
import APIS from 'constants/apiConstants';

const { TITLE } = UI.LastTodayTsx;
const { LAST_TODAY_MESSAGE } = UI.NullDiaryTsx;

const LastToday = () => {
  const [year, month, day] = datesForStringMaker();

  const fetchLastTodayDiary = async () => {
    await renewToken();
    mutate();
  }

  const { mutate,data } = useMutation({
    mutationFn: () => sendTodayForLastDiary(`${year}-${month}-${day}`),
    mutationKey: [APIS.QUERIES.LAST_TODAY],
    onError:()=>fetchLastTodayDiary(),
  })

  useEffect(() => {
    fetchLastTodayDiary()
  }, [])

  const content = data
    ? <DiaryPreview diaryDetails={data as DiaryCameFromServer} />
    : <NullDiary msg={LAST_TODAY_MESSAGE} />

  return (
    <div className={css.total}>
      <h5 className={css.title}>{TITLE}</h5>
      { content }
    </div>
  )
}

export default LastToday