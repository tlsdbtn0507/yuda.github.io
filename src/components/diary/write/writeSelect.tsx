import React, { useEffect, useState } from 'react';
import css from '../../../css/write.module.css'
import { WriteDiaryFeelings } from 'model/types';

interface WriteSelectProps{
  type: string,
  selections: WriteDiaryFeelings
}

const WriteSelect:React.FC<WriteSelectProps> = ({type,selections}):React.ReactElement => {

  const [renderAnima, setRenderAnima] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setRenderAnima(true);
    }, 1500);
  }, [renderAnima]);

  let h2;

  switch (type) {
    case 'feeling':
      h2 = '오늘 하루는 어떠셨나요?';
      break;
  
    default:
      break;
  }

  return (
    <div className={css.selectWrapper}>
      <h2 className={renderAnima ? css.sectionMentS : css.sectionMent}>{h2}</h2>
      {`${renderAnima},${selections}`}
    </div>
  )
};

export default WriteSelect