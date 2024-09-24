import { diaryStore } from 'store/diary/diaryStore'
import css from '../../../../css/write.module.css'

const WriteDoneBtn = () => {

  const { isDiaryWritten, setWritingDiary, diaryFeelingReason } =
    diaryStore(state => state);

  const isBtnDisabled = diaryFeelingReason.length === 0;

  const handleDoneBtn = () => {
    switch (isBtnDisabled) {
      case true:
        const checkReasonNull = window.confirm('정말 아무것도 안적으시게요?');
        if (checkReasonNull) setWritingDiary({ ...isDiaryWritten, feelingReason: ' ' });
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
      작성완료{isBtnDisabled ? '?' :'!'}
    </button>
  )
}

export default WriteDoneBtn