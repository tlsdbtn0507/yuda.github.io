import PwDiv from '../components/sign/pwDiv';
import IdCheckBtn from '../components/sign/idCheckBtn';
import css from '../css/sign.module.css'

import { Form } from 'react-router-dom'
import { userStore } from '../store/user/userStore';
import { useRef, useState } from 'react';
import { checkIdDuple } from '../api/users/usersApi';
import { useMutation } from '@tanstack/react-query';

const Sign = () => {

  const [idChecked, setIdChecked] = useState<boolean | string>('not');
  
  const [idInput, setIdInput] = useState<string>('');

  const idToCheckDuple = useRef<HTMLInputElement>(null);

  const { pwCheck } = userStore(state => state);

  const { mutate } = useMutation({
    mutationFn: checkIdDuple,
    onSuccess: (data) => setIdChecked(data)
  });

  const doOtherThing = (e: React.FormEvent) => {
    e.preventDefault();
    const { value } = idToCheckDuple.current as HTMLInputElement;
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    
    if (value === '' || korean.test(value) || value.length < 4) {
      idToCheckDuple.current?.focus();
      setIdChecked('not');
      idToCheckDuple.current!.value = '';
      return alert('ID를 확인해주세요')
    }
    mutate(value);
    setIdInput(value);
  };

  const checkId = () => {
    const target = idToCheckDuple.current?.value as string;
    if(idInput !== target) setIdChecked('not')
  }

  const permitSub = (e: React.FormEvent) => {
    if (!idChecked) {
      alert('아이디 중복검사를 체크해주세요!')
      idToCheckDuple.current?.focus();
      e.preventDefault();
    }
    if (!pwCheck) {
      alert('비밀번호 중복 검사를 해주세요')
      document.getElementById('pwCheck')?.focus()
      e.preventDefault();
    }
    if(idChecked && pwCheck) return
  }

  return(
    <div className={css.total}>
      <Form className={css.div} method='post'>
        <h1>회원가입</h1> 
          <label htmlFor="userName">이름</label>
            <input required type="userName" id='name' name='name'/>
          <label htmlFor="userId">아이디
          <IdCheckBtn onClick={doOtherThing} isIdVal={idChecked} />
          </label>
        <input
          required type="userId" id='userId' name='userId' ref={idToCheckDuple}
          onChange={checkId}
          placeholder='한글 사용 불가 및 최소 4자'/>
        <label htmlFor="pw">비밀번호</label>
          <PwDiv type='pw' />
        <label htmlFor="pwCheck">비밀번호 확인</label>
          <PwDiv type='pwCheck' />
        <button type='submit' onClick={permitSub} className={css.sendBtn}>회원가입 완료</button>
       </Form>
    </div>
  )
}

export default Sign