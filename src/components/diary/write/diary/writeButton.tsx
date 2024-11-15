import React from 'react';
import css from '../../../../css/write.module.css'
import { diaryStore } from 'store/diary/diaryStore';
import { WriteDiaryFeeling, WriteDiaryWeather, WriteDiaryEnum } from 'model/interfaces';
import { FEELINGS, WEATHERS, WEATHER_LEVELS } from 'model/constants';

interface WriteButtonProps {
  ment: string,
  type: string
}

const WriteButton: React.FC<WriteButtonProps> = ({ ment, type }): React.ReactElement => {

  const { setWritingDiary, isDiaryWritten } = diaryStore(state => state);

  const selectBtnHandler = () => {
    switch (type) {
      case WriteDiaryEnum.Feeling:
        const feeling = FEELINGS.find(e => e.ment === ment) as WriteDiaryFeeling;
        if (isDiaryWritten.weather)
          return setWritingDiary({ ...isDiaryWritten, feeling });
        setWritingDiary({ feeling, weather: {} });
        break;

      case WriteDiaryEnum.Weather:
        const weather = WEATHERS.find(e => e.weatherCond === ment) as WriteDiaryWeather;
        const diary = { ...isDiaryWritten, weather };
        setWritingDiary(diary);
        break;

      case WriteDiaryEnum.WeatherLevel:
        const weatherLevel = WEATHER_LEVELS.find(e => e.ment === ment) as WriteDiaryFeeling;
        const { weatherCond } = isDiaryWritten.weather as WriteDiaryWeather;
        const toPut = {
          ...isDiaryWritten,
          weather: {
            weatherCond,
            weatherLevel
          }
        }
        setWritingDiary(!toPut.feelingReason ? { ...toPut, feelingReason: '' } : toPut);
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