import css from '../../../css/write.module.css'
import { WriteDiaryFeeling, WriteDiaryWeather } from 'model/interfaces';

import React, { useEffect, useState } from 'react';
import WriteButton from './writeButton';

interface WriteSelectProps{
  type: string,
  selections: WriteDiaryFeeling[] | WriteDiaryWeather[]
}

const WriteSelect:React.FC<WriteSelectProps> = ({type,selections}):React.ReactElement => {

  const [renderAnima, setRenderAnima] = useState<boolean>(false);

  let h2;
  let content;

  useEffect(() => {
    setTimeout(() => {
      setRenderAnima(true);
    }, 1500);
  }, [renderAnima]);
    
  switch (type) {
    case 'feeling':
      h2 = '오늘 하루는 어떠셨나요?';
      const feelingsSelection = selections as WriteDiaryFeeling[];
      content = feelingsSelection.map(e =>
          <WriteButton type={type} key={e.level} ment={e.ment} />);
      break;
    
    case 'weather':
      h2 = '오늘 날씨는 어땠나요?';
      const weatherSelection = selections as WriteDiaryWeather[];
      content = weatherSelection.map(e =>
        <WriteButton type={type} key={e.weatherCond} ment={e.weatherCond}/>)
      break;
    case 'weatherDetail':
      break;
    
    default:
      break;
  };

  return (
    <div className={css.selectWrapper}>
      <h2 className={renderAnima ? css.sectionMentS : css.sectionMent}>{h2}</h2>
      <div className={renderAnima ? css.selectBtnWrapS : css.selectBtnWrap}>
        {content}
      </div>
    </div>
  )
};

export default WriteSelect