import css from '../../../../css/write.module.css'
import { WriteDiary, WriteDiaryFeeling, WriteDiaryWeather, WriteDiaryEnum } from 'model/interfaces';

import React, { useEffect, useState } from 'react';
import WriteButton from './writeButton';
import { diaryStore } from 'store/diary/diaryStore';
import { mentMaker } from 'utils/util';
import WriteTextArea from './writeTextArea';
import WriteDoneBtn from './writeDoneBtn';

interface WriteSelectProps{
  type: string,
  selections?: WriteDiaryFeeling[] | WriteDiaryWeather[]
}

const WriteSelect:React.FC<WriteSelectProps> = ({type,selections}):React.ReactElement => {

  const [renderAnima, setRenderAnima] = useState<boolean>(false);
  const [renderAnima2, setRenderAnima2] = useState<boolean>(false);
  const [renderAnima3, setRenderAnima3] = useState<boolean>(false);
  const { isDiaryWritten } = diaryStore(state => state);

  let h2;
  let content;

  const animationArray = [
    { func: setRenderAnima, time: 1500 },
    { func: setRenderAnima2, time: 2000 },
    { func: setRenderAnima3, time: 2500 },
  ];

  useEffect(() => {
    animationArray.forEach(e => setTimeout(() => e.func(true), e.time));
  },);
    
  switch (type) {
    case WriteDiaryEnum.Feeling:
      const feelingsSelection = selections as WriteDiaryFeeling[];

      h2 = '오늘 하루는 어떠셨나요?';
      content = feelingsSelection.map(e =>
          <WriteButton type={type} key={e.level} ment={e.ment} />);
      break;
    
    case WriteDiaryEnum.Weather:
      const weatherSelection = selections as WriteDiaryWeather[];

      h2 = '오늘 날씨는 어땠나요?';
      content = weatherSelection.map(e =>
        <WriteButton type={type} key={e.weatherCond} ment={e.weatherCond}/>)
      break;
    
    case WriteDiaryEnum.WeatherLevel:
      const { weatherCond } = isDiaryWritten.weather as WriteDiaryWeather;
      const weatherLevelSelection = selections as WriteDiaryFeeling[];

      h2 = `얼마나 ${weatherCond.slice(0, -1)}나요?`;
      content =  weatherLevelSelection.map(e =>
        <WriteButton type={type} key={e.level} ment={e.ment} />)
      break;
    
    case WriteDiaryEnum.FeelingReason:
      const { feeling } = isDiaryWritten as WriteDiary;

      h2 = `왜 ${mentMaker(feeling as WriteDiaryFeeling)}나요?`;
      content = <WriteTextArea/>
      break;
    
    default:
      break;
  };

  const showNextBtn = type === WriteDiaryEnum.FeelingReason;

  return (
    <div className={css.selectWrapper}>
      <h2 className={renderAnima ? css.sectionMentS : css.sectionMent}>{h2}</h2>
      <div className={renderAnima2 ? css.selectBtnWrapS : css.selectBtnWrap}>
        {content}
      </div>
      {
        showNextBtn &&
        <div className={renderAnima3 ? css.selectDoneBtnS : css.selectDoneBtn}>
          <WriteDoneBtn />
        </div>
      }
    </div>
  )
};

export default WriteSelect