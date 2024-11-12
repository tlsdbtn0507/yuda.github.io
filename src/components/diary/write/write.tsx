import CloseBtn from 'components/util/closeBtn';
import css from '../../../css/write.module.css'
import WriteSelect from './diary/writeSelect';

import { useEffect, useState } from 'react';

import { WriteDiary, WriteDiaryFeeling, WriteDiaryWeather, WriteDiaryEnum }
  from 'model/interfaces';

import { whichObjIsEmpty } from 'utils/util';
import { diaryStore } from 'store/diary/diaryStore';
import { FEELINGS, WEATHERS, WEATHER_LEVELS } from 'model/constants';
import WriteSum from './summary/writeSum';

const Write = () => {

  const [content, setContent] = useState<React.ReactElement | null>(null);
  const { setWritingDiary, isDiaryWritten } = diaryStore(state => state);

  const whichSelectRender = (which: string) => {
    switch (which) {
      case 'f':
        const feelings = FEELINGS as WriteDiaryFeeling[];
        setContent(
          <WriteSelect type={WriteDiaryEnum.Feeling} selections={feelings} />);
        break;

      case 'w':
        const weathers = WEATHERS as WriteDiaryWeather[];
        setContent(
          <WriteSelect type={WriteDiaryEnum.Weather} selections={weathers} />);
        break;

      case 'wl':
        const weatherLevel = WEATHER_LEVELS as WriteDiaryFeeling[];
        setContent(
          <WriteSelect type={WriteDiaryEnum.WeatherLevel} selections={weatherLevel} />);
        break;

      case 'fr':
        setContent(<WriteSelect type={WriteDiaryEnum.FeelingReason} />)
        break;

      case 'd':
        setContent(<WriteSum />)
        break;

      default:
        break;
    };
  };

  useEffect(() => {
    switch (whichObjIsEmpty(isDiaryWritten)) {
      case null:
        const writingDiary: WriteDiary = { feeling: {} };
        setWritingDiary(writingDiary);
        whichSelectRender('f');
        break;

      case WriteDiaryEnum.Feeling:
        whichSelectRender('f')
        break;

      case WriteDiaryEnum.Weather:
        whichSelectRender('w');
        break;

      case WriteDiaryEnum.WeatherLevel:
        whichSelectRender('wl');
        break;

      case WriteDiaryEnum.FeelingReason:
        whichSelectRender('fr');
        break;

      case 'done':
        whichSelectRender('d');
        break;

      default:
        break;
    }


  }, [isDiaryWritten, setWritingDiary]);


  return (
    <div className={css.total}>
      <CloseBtn />
      {content}
    </div>
  )
};

export default Write