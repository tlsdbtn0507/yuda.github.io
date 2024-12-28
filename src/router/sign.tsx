import { Form } from "react-router-dom";
import { userStore } from "../store/user/userStore";
import { useRef, useState } from "react";
import { checkIdDuple } from "../api/users/usersApi";
import { useMutation } from "@tanstack/react-query";
import { handleAlertPerDevice } from "utils/util";

import PwDiv from "../components/sign/pwDiv";
import IdCheckBtn from "../components/sign/idCheckBtn";
import css from "../css/sign.module.css";
import UI from "constants/uiConstants";
import APIS from "constants/apiConstants";

const {
  EMPTY_STRING,
  IdCheckBtnTsx: { STRING_NOT },
  SignTsx,
  PwDivTsx: { STRING_UNDER_SIX },
} = UI;
const {
  CHECK_ID,
  ASK_CHECK_ID_DUPLE,
  ASK_CHECK_PW_DUPLE,
  H1_TITLE,
  INPUT_LABEL: { NAME, ID, PW, PW_CHECK },
  PLACE_HOLDER,
  SIGN_DONE,
} = SignTsx;
const { STRING_PWCHECK } = APIS;

const Sign = () => {
  const [idChecked, setIdChecked] = useState<boolean | string>(STRING_NOT);
  const [idInput, setIdInput] = useState<string>(EMPTY_STRING);
  const [spinActivate, setSpinActivate] = useState<boolean>(false);

  const idInputRef = useRef<HTMLInputElement>(null);

  const { pwCheck } = userStore((state) => state);

  const { mutate } = useMutation({
    mutationFn: checkIdDuple,
    onSettled: () => setSpinActivate(false),
    onSuccess: (data) => setIdChecked(data),
  });

  const checkIsIdDuplicated = (e: React.FormEvent) => {
    e.preventDefault();
    setSpinActivate(true);

    const { value } = idInputRef.current as HTMLInputElement;
    const KOREAN_REGEX = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    if (
      value === EMPTY_STRING ||
      KOREAN_REGEX.test(value) ||
      value.length < 4
    ) {
      idInputRef.current!.value = EMPTY_STRING;
      idInputRef.current?.focus();
      setIdChecked(STRING_NOT);

      return handleAlertPerDevice(CHECK_ID);
    }
    mutate(value);
    setIdInput(value);
  };

  const checkId = () => {
    const target = idInputRef.current?.value as string;

    //먼저 사용불가된 id를 또 입력할 때를 대비한 코드
    if (idInput !== target) setIdChecked(STRING_NOT);
  };

  const permitSub = (e: React.FormEvent) => {
    if (!idChecked) {
      handleAlertPerDevice(ASK_CHECK_ID_DUPLE);
      idInputRef.current?.focus();
      return e.preventDefault();
    }
    if (!pwCheck) {
      handleAlertPerDevice(ASK_CHECK_PW_DUPLE);
      document.getElementById(STRING_PWCHECK)?.focus();
      return e.preventDefault();
    }
    if (idChecked && pwCheck) return;
  };

  return (
    <div className={css.total}>
      <Form className={css.div} method="post">
        <h1>{H1_TITLE}</h1>
        <label htmlFor="userName">{NAME}</label>
        <input required type="userName" id="name" name="name" />
        <label htmlFor="userId">
          {ID}
          <IdCheckBtn
            onClick={checkIsIdDuplicated}
            isIdVal={idChecked}
            isSpinActivate={spinActivate}
          />
        </label>
        <input
          required
          type="userId"
          id="userId"
          name="userId"
          ref={idInputRef}
          onChange={checkId}
          placeholder={PLACE_HOLDER}
        />
        <label htmlFor="pw">{PW}</label>
        <PwDiv type="pw" />
        <p className={css.pwConditionString}>{STRING_UNDER_SIX}</p>
        <label htmlFor="pwCheck">{PW_CHECK}</label>
        <PwDiv type="pwCheck" />
        <button type="submit" onClick={permitSub} className={css.sendBtn}>
          {SIGN_DONE}
        </button>
      </Form>
    </div>
  );
};

export default Sign;
