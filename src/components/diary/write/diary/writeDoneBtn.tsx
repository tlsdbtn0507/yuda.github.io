import { diaryStore } from 'store/diary/diaryStore'

import css from '../../../../css/write.module.css'
import UI from 'constants/uiConstants';
import APIS from 'constants/apiConstants';
import { handleConfirmPerDevice } from 'utils/util';

const WriteDoneBtn = () => {
  const { WriteDoneBtnTsx: { NOTHING, DONE_STRING, MARKS }, SPACE_STRING } = UI;
  const { isDiaryWritten, setWritingDiary, diaryFeelingReason } =
    diaryStore(state => state);

  const isBtnDisabled = diaryFeelingReason.length === APIS.NUM_ZERO;

  const handleDoneBtn = () => {
    switch (isBtnDisabled) {
      case true:
        const checkReasonNull = handleConfirmPerDevice(NOTHING);
        if (checkReasonNull) setWritingDiary({ ...isDiaryWritten, feelingReason: SPACE_STRING });
        break;

      case false:
        setWritingDiary({ ...isDiaryWritten, feelingReason: diaryFeelingReason });
        break;

      default:
        break;
    }

  };

  const doneBtnClass = isBtnDisabled ? css.notDoneBtn : css.doneBtn

  return (
    <button
      className={doneBtnClass}
      onClick={handleDoneBtn}>
      {DONE_STRING}{isBtnDisabled ? MARKS.QEUSTION : MARKS.EXCLAMATION}
    </button>
  )
}

export default WriteDoneBtn