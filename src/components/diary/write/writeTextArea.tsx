import { useRef } from 'react';
import css from '../../../css/write.module.css'
import { diaryStore } from 'store/diary/diaryStore';

const WriteTextArea = () => {

  const textRef = useRef<HTMLTextAreaElement>(null);
  const { setWritingDiary , isDiaryWritten } = diaryStore(state => state);
  
  const writeDairyFeelingReason = () => {
    const feelingReason = textRef.current!.value;
    const writing = { ...isDiaryWritten, feelingReason };
    setWritingDiary(writing);
  };

  return (
    <textarea
      ref={textRef}
      className={css.textArea} placeholder='직접 적어보아요'
      onBlur={writeDairyFeelingReason}>
    </textarea>
  )
}

export default WriteTextArea