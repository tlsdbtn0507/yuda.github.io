import CloseBtn from 'components/util/closeBtn';
import css from '../../../css/write.module.css'
import WriteSelect from './writeSelect';

import { useEffect, useState } from 'react';
import { WriteDiary, WriteDiaryFeeling, WriteDiaryWeather } from 'model/interfaces';
import { whichObjIsEmpty } from 'utils/util';
import { diaryStore } from 'store/diary/diaryStore';
import { FEELINGS, WEATHERS } from 'model/constants';

const Write = () => {

  const [content, setContent] = useState<React.ReactElement | null>(null);
  const { setWritingDiary, isDiaryWritten } = diaryStore(state => state);

  const whichSelectRender = (which: string) => {
    switch (which) {
      case 'f':
        const feelings = FEELINGS as WriteDiaryFeeling[];
        setContent(<WriteSelect type={'feeling'} selections={feelings} />);
        break;
      
      case 'w':
        const weathers = WEATHERS as WriteDiaryWeather[];
        setContent(<WriteSelect type={'weather'} selections={weathers} />);
        break;
      
      default:
        break;
    };
  };

  useEffect(() => {

    if (isDiaryWritten === null) {
      const writingDiary: WriteDiary = { feeling: {} };
      setWritingDiary(writingDiary);
      return whichSelectRender('f');
    };
    

    switch (whichObjIsEmpty(isDiaryWritten)) {
      case 'feeling':
        whichSelectRender('f')
        break;
    
      case 'weather':
        whichSelectRender('w');
        break;
      
      default:
        break;
    }

    
  }, [isDiaryWritten,setWritingDiary]);


  return (
    <div className={css.total}>
      <CloseBtn />
      {content}
    </div>
  )
};

export default Write