import { useState } from "react";
import { userStore } from "../../store/user/userStore";

import css from "../../css/sign.module.css";
import Icons from "./icons";
import UI from "constants/uiConstants";

interface PwDivType {
  type: string;
}

const { CHECK_PW } = UI.PwDivTsx;
const LOWER_CASE_PW = "pw";

const PwDiv = (props: PwDivType) => {
  const [isValid, setIsValid] = useState(true);
  const [isInitial, setIsInitial] = useState(true);

  const { pw, setUserPw, setUserPWCheck } = userStore((state) => state);

  const { type } = props;

  const checkPwValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsInitial(false);
    const { value } = e.target;
    const PW_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_])/;
    if (value.length < 6 || !PW_REGEX.test(value)) {
      setIsValid(false);
    } else {
      setIsValid(true);
      setUserPw(value);
    }
  };

  const isPwCheck = {
    placeholder:
      type === LOWER_CASE_PW ? UI.EMPTY_STRING : CHECK_PW,
  };

  const checkPwAcc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsInitial(false);
    const { value } = e.target;
    if (value === pw) {
      setIsValid(true);
      setUserPWCheck(true);
      return;
    }
    setIsValid(false);
    setUserPWCheck(false);
  };

  return (
    <div className={css.divpw}>
      <input
        className={isInitial ? css.pwInput : isValid ? css.pwInput : css.pwInputVal}
        required
        type="password"
        id={type}
        name={type}
        placeholder={isPwCheck.placeholder}
        onChange={type === LOWER_CASE_PW ? checkPwValid : checkPwAcc}
        onBlur={type === LOWER_CASE_PW ? () => { } : checkPwAcc}
      />
      <Icons isInit={isInitial} isVal={isValid} />
    </div>
  );
};

export default PwDiv;
