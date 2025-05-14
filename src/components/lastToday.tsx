import { useMutation } from '@tanstack/react-query';
import { sendTodayForLastDiary } from 'api/diary/diaryApi';
import { DiaryCameFromServer } from 'model/interfaces';
import React, { useEffect, useRef } from 'react';
import { renewToken } from 'api/users/usersApi';

import css from '../css/laTod.module.css'
import NullDiary from './diary/nullDiary';
import UI from 'constants/uiConstants';
import DiaryPreview from './diary/list/diaryPreview';
import APIS from 'constants/apiConstants';

const { TITLE } = UI.LastTodayTsx;
const { LAST_TODAY_MESSAGE } = UI.NullDiaryTsx;

const TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

const LastToday = () => {

  const hasMutated = useRef(false);
  
  const handleFetchingToday = async() => {
    await renewToken();
    mutate();
  }

  const { mutate,data } = useMutation({
    mutationFn: () => sendTodayForLastDiary(TIME_ZONE),
    mutationKey: [APIS.QUERIES.LAST_TODAY],
    onError:handleFetchingToday,
  })

  useEffect(() => {
    if (!hasMutated.current) {
      mutate();
      hasMutated.current = true;
    }
  }, [mutate])

  const content = data
    ? <DiaryPreview style={{"--preview-height": "30%" } as React.CSSProperties} diaryDetails={data as DiaryCameFromServer} />
    : <NullDiary msg={LAST_TODAY_MESSAGE} />

  return (
    <div className={css.total}>
      <h5 className={css.title}>{TITLE}</h5>
      { content }
    </div>
  )
}

export default LastToday