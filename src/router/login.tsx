import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { login } from '../api/users/usersApi'

import css from '../css/login.module.css'
import UI from 'constants/uiConstants'
import ERROR from 'constants/ErrorConstants'
import APIS from 'constants/apiConstants'

const { EMPTY_STRING, LOGIN: { HEAD, ID, PW, UI_LOGIN, GO_SIGN, SIGN } } = UI;
const { MAIN } = APIS.ROUTES;

const Login = () => {

  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess(data) {
      if (data) {
        return navigate(MAIN);
      }
      alert(ERROR.LOGIN_FAIL);
      idRef.current!.value = EMPTY_STRING;
      pwRef.current!.value = EMPTY_STRING;
    },
  });

  const submitLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const id = idRef.current!.value;
    const pw = pwRef.current!.value;

    mutate({ id, pw })
  }

  return (
    <div className={css.div}>
      <form className={css.form} method='post' onSubmit={submitLogin}>
        <h1>{HEAD}</h1>
        <label htmlFor='id' id='id' className={css.font}>
          <FontAwesomeIcon icon={faUser} />
          {ID}
        </label>
        <input ref={idRef} required type="text" name="id" id="id" />
        <label htmlFor='pw' id='pw' className={css.font}>
          <FontAwesomeIcon icon={faLock} />
          {PW}
        </label>
        <input ref={pwRef} required type="password" name="pw" id="pw" />
        <button type='submit' className={css.btn}>
          {UI_LOGIN}
        </button>
        <p className={css.sign}>
          {GO_SIGN}
          <Link to={'/sign'}>
            {SIGN}
          </Link>
        </p>
      </form>
    </div>
  )
}
export default Login;
