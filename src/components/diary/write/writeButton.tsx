import React from 'react';
import css from '../../../css/write.module.css'
import { diaryStore } from 'store/diary/diaryStore';
import { WriteDiaryFeeling } from 'model/interfaces';
import { FEELINGS } from 'model/constants';

interface WriteButtonProps {
  ment: string,
  type:string
}

const WriteButton: React.FC<WriteButtonProps> = ({ ment, type }): React.ReactElement => {
  
  const { setWritingDiary } = diaryStore(state => state);
  
  const selectBtnHandler = () => {
    switch (type) {
      case 'feeling':
        const feeling = FEELINGS.find(e => e.ment === ment) as WriteDiaryFeeling;
        setWritingDiary({ feeling, weather: {} });
        break;
    
      default:
        break;
    }
  }

  const btnCss = type === 'weather' ? css.selectBtnW : css.selectBtn

  return (
    <button className={btnCss} onClick={selectBtnHandler}>
      {ment}
    </button>
  )
};

export default WriteButton