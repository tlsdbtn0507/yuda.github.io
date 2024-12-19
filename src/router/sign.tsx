import { Form } from 'react-router-dom'
import { userStore } from '../store/user/userStore';
import { useRef, useState } from 'react';
import { checkIdDuple } from '../api/users/usersApi';
import { useMutation } from '@tanstack/react-query';
import { handleAlertPerDevice } from 'utils/util';

import PwDiv from '../components/sign/pwDiv';
import IdCheckBtn from '../components/sign/idCheckBtn';
import css from '../css/sign.module.css'
import UI from 'constants/uiConstants';
import APIS from 'constants/apiConstants';

const { EMPTY_STRING, IdCheckBtnTsx: { STRING_NOT }, SignTsx } = UI;
const {
  CHECK_ID,
  ASK_CHECK_ID_DUPLE,
  ASK_CHECK_PW_DUPLE,
  H1_TITLE,
  INPUT_LABEL: { NAME, ID, PW, PW_CHECK },
  PLACE_HOLDER,
  SIGN_DONE
} = SignTsx;
const { STRING_PWCHECK } = APIS;

const Sign = () => {

  const [idChecked, setIdChecked] = useState<boolean | string>(STRING_NOT);

  const [idInput, setIdInput] = useState<string>(EMPTY_STRING);

  const idToCheckDuple = useRef<HTMLInputElement>(null);

  const { pwCheck } = userStore(state => state);

  const { mutate } = useMutation({
    mutationFn: checkIdDuple,
    onSuccess: (data) => setIdChecked(data)
  });

  const doOtherThing = (e: React.FormEvent) => {
    e.preventDefault();

    const { value } = idToCheckDuple.current as HTMLInputElement;
    const KOREAN_REGEX = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    if (value === EMPTY_STRING || KOREAN_REGEX.test(value) || value.length < 4) {
      idToCheckDuple.current?.focus();
      setIdChecked(STRING_NOT);
      idToCheckDuple.current!.value = EMPTY_STRING;
      return handleAlertPerDevice(CHECK_ID);
    }
    mutate(value);
    setIdInput(value);
  };

  const checkId = () => {
    const target = idToCheckDuple.current?.value as string;
    if (idInput !== target) setIdChecked(STRING_NOT)
  }

  const permitSub = (e: React.FormEvent) => {
    if (!idChecked) {
      handleAlertPerDevice(ASK_CHECK_ID_DUPLE);
      idToCheckDuple.current?.focus();
      return e.preventDefault();
    }
    if (!pwCheck) {
      handleAlertPerDevice(ASK_CHECK_PW_DUPLE);
      document.getElementById(STRING_PWCHECK)?.focus()
      return e.preventDefault();
    }
    if (idChecked && pwCheck) return
  }

  return (
    <div className={css.total}>
      <Form className={css.div} method='post'>
        <h1>{H1_TITLE}</h1>
        <label htmlFor="userName">
          {NAME}
        </label>
        <input required type="userName" id='name' name='name' />
        <label htmlFor="userId">
          {ID}
          <IdCheckBtn onClick={doOtherThing} isIdVal={idChecked} />
        </label>
        <input
          required type="userId" id='userId' name='userId' ref={idToCheckDuple}
          onChange={checkId}
          placeholder={PLACE_HOLDER} />
        <label htmlFor="pw">
          {PW}
        </label>
        <PwDiv type='pw' />
        <label htmlFor="pwCheck">
          {PW_CHECK}
        </label>
        <PwDiv type='pwCheck' />
        <button type='submit' onClick={permitSub} className={css.sendBtn}>
          {SIGN_DONE}
        </button>
      </Form>
    </div>
  )
}

export default Sign