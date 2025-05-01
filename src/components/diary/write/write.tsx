import { useEffect, useState } from 'react';
import {
  WriteDiaryFeeling,
  WriteDiaryWeather,
  WriteDiaryEnum,
  IsDiaryWritten
}
  from 'model/interfaces';
import { dayMakerToSend, whichObjIsEmpty } from 'utils/util';
import { diaryStore } from 'store/diary/diaryStore';
import { FEELINGS, WEATHERS, WEATHER_LEVELS } from 'model/constants';

import CloseBtn from 'components/util/closeBtn';
import css from '../../../css/write.module.css'
import WriteSelect from './diary/writeSelect';
import WriteSum from './summary/writeSum';
import UI from 'constants/uiConstants';

const { DONE, WriteTsx: { FEELING, WEATHER, WEATHER_LEVEL, FEELING_REASON } } = UI;

const Write = () => {

  const [content, setContent] = useState<React.ReactElement | null>(null);
  const { setWritingDiary, isDiaryWritten } = diaryStore(state => state);

  const whichSelectRender = (which: string) => {
    switch (which) {
      case FEELING:
        const feelings = FEELINGS as WriteDiaryFeeling[];
        setContent(
          <WriteSelect type={WriteDiaryEnum.Feeling} selections={feelings} />);
        break;

      case WEATHER:
        const weathers = WEATHERS as WriteDiaryWeather[];
        setContent(
          <WriteSelect type={WriteDiaryEnum.Weather} selections={weathers} />);
        break;

      case WEATHER_LEVEL:
        const weatherLevel = WEATHER_LEVELS as WriteDiaryFeeling[];
        setContent(
          <WriteSelect type={WriteDiaryEnum.WeatherLevel} selections={weatherLevel} />);
        break;

      case FEELING_REASON:
        setContent(<WriteSelect type={WriteDiaryEnum.FeelingReason} />)
        break;

      case DONE:
        setContent(<WriteSum />)
        break;

      default:
        break;
    };
  };

  useEffect(() => {
    const whichComponentRender = whichObjIsEmpty(isDiaryWritten);

    if (!whichComponentRender) {
      const writingDiary: IsDiaryWritten = { feeling: {}, diaryDate: dayMakerToSend() };
      setWritingDiary(writingDiary);
      return whichSelectRender(FEELING);
    }
    return whichSelectRender(whichComponentRender as string);

  }, [isDiaryWritten, setWritingDiary]);

  return (
    <div className={css.total}>
      <CloseBtn />
      {content}
    </div>
  )
};

export default Write