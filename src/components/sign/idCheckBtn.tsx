import { useState } from 'react';
import { BtnType } from '../../model/interfaces';

import css from '../../css/sign.module.css'
import UI from 'constants/uiConstants';

const { CHECK_ID_DUPLE, STRING_NOT, CANT_USE, CAN_USE } = UI.IdCheckBtnTsx;

const IdCheckBtn = (props: BtnType) => {

  const { isIdVal } = props;

  const [isClicked, setIsClicked] = useState(false);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    props.onClick(e);
    setIsClicked(true);
  };

  let btnContent = CHECK_ID_DUPLE;

  if (!isClicked && isIdVal === STRING_NOT) btnContent = CHECK_ID_DUPLE;
  if (isClicked && isIdVal !== STRING_NOT) btnContent = CAN_USE;
  if (isClicked && isIdVal !== null && !isIdVal) btnContent = CANT_USE;

  return (
    <button className=
      {btnContent === CHECK_ID_DUPLE || isIdVal ? css.checkBtn : css.checkBtnValid}
      onClick={send}>
      {btnContent}
    </button>
  )
}

export default IdCheckBtn