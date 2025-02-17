import { diaryStore } from 'store/diary/diaryStore';
import { DiaryToSendToSurver, IsDiaryWritten, } from 'model/interfaces';
import { dayMakerToSend, handleAlertPerDevice, whichDayIsitToday } from 'utils/util';
import { useMutation } from '@tanstack/react-query';
import { writeTodayDiary } from 'api/diary/diaryApi';
import { userStore } from 'store/user/userStore';
import { queryClient } from 'App';

import css from '../../../../css/write.module.css'
import SelectedMakeBtns from './selectedMakeBtns';
import UI from 'constants/uiConstants';
import APIS from 'constants/apiConstants';

const { SUCCESS_ALERT, FAIL_ALERT } = UI.SelectedTsx;
const { DIARIES } = APIS.QUERIES;

const Selected = () => {

  const { isDiaryWritten } = diaryStore(state => state);
  const { currentLoc, setCurrentLoc } = userStore(state => state);
  const { toggleWriteDairy } = diaryStore(state => state);

  const { mutate } = useMutation({
    mutationFn: writeTodayDiary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DIARIES], exact: true });
      handlePostResult(true)
    },
    onError: () => handlePostResult(false),
  });

  const handlePostResult = (result: boolean) => {
    handleAlertPerDevice(result ? SUCCESS_ALERT : FAIL_ALERT);
    toggleWriteDairy(false);
  }

  const checkIsLocEmpty = (loc: { lat: string, long: string }) => {
    return !loc.lat || !loc.long;
  }

  const submitDiary = async () => {
    //현재위치가 없는 상태에서 일기 요청 가능성 대처
    if (checkIsLocEmpty(currentLoc)) {
      await setCurrentLoc();
    }

    const diaryToSendToSurver: DiaryToSendToSurver = {
      ...isDiaryWritten as Required<IsDiaryWritten>,
      ...userStore.getState().currentLoc,
      diaryDate: dayMakerToSend(),
      dayOfWeek: whichDayIsitToday()
    };

    mutate(diaryToSendToSurver)
  };

  return (
    <div className={css.selected}>
      <SelectedMakeBtns />
      <button className={css.sumDoneBtn} onClick={submitDiary}>끝내기!</button>
    </div>
  )
}

export default Selected