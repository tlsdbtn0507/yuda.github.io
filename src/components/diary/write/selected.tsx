import css from '../../../css/write.module.css'
import { isEmptyObj } from 'utils/util';
import RemindBtn from './remindBtn';
import { IsDiaryWritten, WriteDiaryFeeling, WriteDiaryWeather } from 'model/interfaces';
import React, { useEffect, useState } from 'react';

interface SelectedProps{
  diary:IsDiaryWritten
}

const Selected:React.FC<SelectedProps> = ({diary}) => {

  const [renderAnima, setRenderAnima] = useState<boolean>(false);

  const isBtnOpacity = (toCheck: WriteDiaryFeeling | WriteDiaryWeather) =>
    !isEmptyObj(toCheck);
  const cssAnima = renderAnima ? css.selectedWrapperS : css.selectedWrapper;

  const btnFeelContent = diary.feeling as WriteDiaryFeeling;
  const btnWeatherContent = diary.weather as WriteDiaryWeather;

  useEffect(() => {
    setTimeout(() => {
      setRenderAnima(true)
    }, 1700);
  }, [renderAnima]);



  return (
    <div className={cssAnima}>
      <div style={{opacity:+isBtnOpacity(diary.feeling as WriteDiaryFeeling)}}>
        <RemindBtn title={'feeling'} content={btnFeelContent.ment} />
      </div>
      <div style={{opacity:+isBtnOpacity(diary.weather as WriteDiaryWeather)}}>
        <RemindBtn title={'weather'} content={btnWeatherContent.weatherCond} />
      </div>
    </div>
  )
}

export default Selected