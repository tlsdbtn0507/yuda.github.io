import { useRef } from 'react';
import { diaryStore } from 'store/diary/diaryStore';

import css from '../../../../css/write.module.css';
import UI from 'constants/uiConstants';

const WriteTextArea = () => {

  const textRef = useRef<HTMLTextAreaElement>(null);
  const { writeDiaryFeelingReason, isDiaryWritten } = diaryStore(state => state);

  const setDiaryReason = () => writeDiaryFeelingReason(textRef.current!.value);

  return (
    <textarea
      ref={textRef}
      className={css.textArea}
      placeholder={UI.WriteTextAreaTsx.PLACE_HOLDER}
      defaultValue={isDiaryWritten.feelingReason}
      onBlur={setDiaryReason}>
    </textarea>
  )
}

export default WriteTextArea