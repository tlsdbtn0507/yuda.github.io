import { useState } from 'react';
import css from '../../css/sign.module.css'
import { BtnType } from '../../model/interfaces';

const IdCheckBtn = (props: BtnType) => {
  const { isIdVal } = props;

  const [isClicked, setIsClicked] = useState(false);
  
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    props.onClick(e);
    setIsClicked(true);
  };
  
  let btnContent = "아이디 중복 조회";
  
  if (!isClicked && isIdVal === "not") btnContent = "아이디 중복 조회";
  if (isClicked && isIdVal !== 'not') btnContent = '사용 가능';
  if (isClicked && isIdVal !== null && !isIdVal) btnContent = '사용 불가능';
  
  return (
    <button className=
      {btnContent === "아이디 중복 조회" || isIdVal ? css.checkBtn : css.checkBtnValid}
        onClick={send}>
      {btnContent}
    </button>
  )
}

export default IdCheckBtn