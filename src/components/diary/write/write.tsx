import CloseBtn from 'components/util/closeBtn';
import css from '../../../css/write.module.css'
import WriteSelect from './writeSelect';
import { useEffect, useState } from 'react';
import { FEELINGS, WriteDiary, WriteDiaryFeeling } from 'model/types';
import { isEmptyObj } from 'utils/util';

const Write = () => {

  const [content, setContent] = useState<React.ReactElement | null>(null);

  const whichSelectRender = (which: string) => {
    switch (which) {
      case 'f':
        const feelings = FEELINGS as WriteDiaryFeeling[];
        setContent(<WriteSelect type={'feeling'} selections={feelings} />);
        break;
    
      default:
        break;
    }
  }

  useEffect(() => { 
    const isDiaryWritten = localStorage.getItem('writingDiary');

    if (!isDiaryWritten) {
      const writingDiary = new Object({ feeling: {} });
      localStorage.setItem('writingDiary', JSON.stringify(writingDiary));
      return whichSelectRender('f')
    };
    
    const writingDiary = JSON.parse(isDiaryWritten as string) as WriteDiary;
    
    if (isEmptyObj(writingDiary.feeling)) whichSelectRender('f')

  }, []);


  return (
    <div className={css.total}>
      <CloseBtn />
      {content}
    </div>
  )
};

export default Write