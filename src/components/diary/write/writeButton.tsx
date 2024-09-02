import React from 'react';
import css from '../../../css/write.module.css'

interface WriteButtonProps {
  ment:string
}

const WriteButton:React.FC<WriteButtonProps> = ({ment}):React.ReactElement => { 

  return (
    <button className={css.selectBtn}>
      {ment}
    </button>
  )
};

export default WriteButton