import React from 'react';
import css from '../../../css/write.module.css'
import { diaryStore } from 'store/diary/diaryStore';
import { WriteDiaryFeeling, WriteDiaryWeather } from 'model/interfaces';
import { FEELINGS, WEATHERS } from 'model/constants';

interface WriteButtonProps {
  ment: string,
  type:string
}

const WriteButton: React.FC<WriteButtonProps> = ({ ment, type }): React.ReactElement => {
  
  const { setWritingDiary ,isDiaryWritten } = diaryStore(state => state);
  
  const selectBtnHandler = () => {
    switch (type) {
      case 'feeling':
        const feeling = FEELINGS.find(e => e.ment === ment) as WriteDiaryFeeling;
        setWritingDiary({ feeling, weather: {} });
        break;
      
      case 'weather':
        const weather = WEATHERS.find(e => e.weatherCond === ment) as WriteDiaryWeather;
        const diary = { ...isDiaryWritten, weather };
        setWritingDiary(diary);
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