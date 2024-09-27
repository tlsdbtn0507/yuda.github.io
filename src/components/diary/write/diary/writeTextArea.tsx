import { useRef } from 'react';
import css from '../../../../css/write.module.css'
import { diaryStore } from 'store/diary/diaryStore';

const WriteTextArea = () => {

  const textRef = useRef<HTMLTextAreaElement>(null);
  const { writeDiaryFeelingReason, isDiaryWritten } = diaryStore(state => state);
  
  const setDiaryReason = () => writeDiaryFeelingReason(textRef.current!.value);

  return (
    <textarea
      ref={textRef}
      className={css.textArea}
      placeholder='직접 적어보아요'
      defaultValue={isDiaryWritten.feelingReason}
      onBlur={setDiaryReason}>
    </textarea>
  )
}

export default WriteTextArea