import { diaryStore } from 'store/diary/diaryStore'
import css from '../../../../css/write.module.css'
import { whichObjIsEmpty } from 'utils/util';

const WriteDoneBtn = () => {

  const { isDiaryWritten } = diaryStore(state => state);

  const isBtnDisabled = isDiaryWritten.feelingReason?.length === 0;

  const handleDoneBtn = () => {
    switch (isBtnDisabled) {
      case true:
        const checkReasonNull = window.confirm('정말 아무것도 안적으시게요?');
        if (checkReasonNull) return console.log('go all selected');
        break;
      
      case false:
        console.log('go all selected');
        console.log(whichObjIsEmpty(isDiaryWritten));
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