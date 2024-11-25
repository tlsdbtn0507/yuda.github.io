import { diaryStore } from 'store/diary/diaryStore';
import { WriteDiaryFeeling, WriteDiaryWeather, WriteDiaryEnum } from 'model/interfaces';
import { FEELINGS, WEATHERS, WEATHER_LEVELS } from 'model/constants';

import React from 'react';
import css from '../../../../css/write.module.css'
import UI from 'constants/uiConstants';

interface WriteButtonProps {
  ment: string,
  type: string
}

const WriteButton: React.FC<WriteButtonProps> = ({ ment, type }): React.ReactElement => {

  const { setWritingDiary, isDiaryWritten } = diaryStore(state => state);

  //type의 결과에 따라 로컬스토리지에 일기를 어떻게 저장할지 조정
  const selectBtnHandler = () => {
    switch (type) {
      //감정 고를때
      case WriteDiaryEnum.Feeling:
        const feeling = FEELINGS.find(e => e.ment === ment) as WriteDiaryFeeling;
        if (isDiaryWritten.weather)
          return setWritingDiary({ ...isDiaryWritten, feeling });
        setWritingDiary({ feeling, weather: {} });
        break;

      //날씨 고를떄
      case WriteDiaryEnum.Weather:
        const weather = WEATHERS.find(e => e.weatherCond === ment) as WriteDiaryWeather;
        const diary = { ...isDiaryWritten, weather };
        setWritingDiary(diary);
        break;

      //날씨의 정도 고를때
      case WriteDiaryEnum.WeatherLevel:
        const weatherLevel = WEATHER_LEVELS.find(e => e.ment === ment) as WriteDiaryFeeling;
        const { weatherCond } = isDiaryWritten.weather as WriteDiaryWeather;
        const toPut = {
          ...isDiaryWritten,
          weather: { weatherCond, weatherLevel }
        };
        if (toPut.feelingReason) {
          return setWritingDiary(toPut);
        }
        setWritingDiary({ ...toPut, feelingReason: UI.EMPTY_STRING });
        break;

      default:
        break;
    }
  }

  const weather = WriteDiaryEnum.Weather;

  const btnCss = type === weather ? css.selectBtnW : css.selectBtn

  return (
    <button className={btnCss} onClick={selectBtnHandler}>
      {ment}
    </button>
  )
};

export default WriteButton