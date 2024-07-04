import css from '../../css/sign.module.css'
import { useState } from 'react';
import Icons from './icons';
import { userStore } from '../../store/user/userStore';

interface PwDivType {
  type: string,
}

const PwDiv = (props: PwDivType) => {
  const [isValid, setIsValid] = useState(true);
  const [isInitial, setIsInitial] = useState(true);

  const { pw, setUserPw, setUserPWCheck } = userStore(state => state);

  const { type } = props;

  const checkPwValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsInitial(false)
    const { value } = e.target;
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_])/
    if (value.length < 6 || !pwRegex.test(value)) {
      setIsValid(false);
    }
    else {
      setIsValid(true)
      setUserPw(value)
    }
  }

  const isPwCheck = {
    placeholder : type === 'pw' ? "영문, 숫자, 특수기호 포함 6글자" : "비밀번호 확인"
  }

  const checkPwAcc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsInitial(false)
    const { value } = e.target;
    if (value === pw) {
      setIsValid(true);
      setUserPWCheck(true)
    }
    else {
      setIsValid(false);
      setUserPWCheck(false)
    }
  }

  return (
    <div className={css.divpw}>
      <input
        className={ isInitial ? css.pwInput : isValid ? css.pwInput : css.pwInputVal}
        required type="password" id={type} name={type}
        placeholder={isPwCheck.placeholder}
        onChange={type === "pw" ? checkPwValid : checkPwAcc}
        onBlur={type === "pw" ? ()=>{} : checkPwAcc}
      />
      <Icons isInit={isInitial} isVal={isValid} />
    </div>
  )
}

export default PwDiv