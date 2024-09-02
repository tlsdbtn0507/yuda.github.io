import React, { useEffect, useState } from 'react';
import css from '../../../css/write.module.css'
import { WriteDiaryFeeling } from 'model/types';
import WriteButton from './writeButton';

interface WriteSelectProps{
  type: string,
  selections: WriteDiaryFeeling[]
}

const WriteSelect:React.FC<WriteSelectProps> = ({type,selections}):React.ReactElement => {

  const [renderAnima, setRenderAnima] = useState<boolean>(false);

  let h2;

  useEffect(() => {
    setTimeout(() => {
      setRenderAnima(true);
    }, 1500);
  }, [renderAnima]);
    
  switch (type) {
    case 'feeling':
      h2 = '오늘 하루는 어떠셨나요?';
      break;
    
    default:
      break;
  };

  return (
    <div className={css.selectWrapper}>
      <h2 className={renderAnima ? css.sectionMentS : css.sectionMent}>{h2}</h2>
      <div className={renderAnima ? css.selectBtnWrapS : css.selectBtnWrap}>
        {selections.map(e => <WriteButton key={e.level} ment={e.ment} />)}
      </div>
    </div>
  )
};

export default WriteSelect