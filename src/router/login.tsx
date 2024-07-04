import { useNavigate } from 'react-router-dom'
import css from '../css/login.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { login } from '../api/users/usersApi'

const Login = () => { 

  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess(data) {
      if (data) {
        localStorage.setItem('refreshToken',data.refreshToken)
        localStorage.setItem('nonRef','nonRef')
        navigate('/main');
      } else {
        alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요');
        idRef.current!.value = '';
        pwRef.current!.value = '';
      };
    },
  });

  const submitLogin = (e:React.FormEvent) => {
    e.preventDefault();

    const id = idRef.current!.value;
    const pw = pwRef.current!.value;

    mutate({id,pw})
  }

  return(
    <div className={css.div}>
      <form className={css.form} method='post' onSubmit={submitLogin}>
        <h1>Log In</h1>
        <label htmlFor='id' id='id'className={css.font}>
          <FontAwesomeIcon icon={faUser}/> ID
        </label>
        <input ref={idRef} required type="text" name="id" id="id" />
        <label htmlFor='pw' id='pw'className={css.font}>
          <FontAwesomeIcon icon={faLock}/> PW
        </label>
        <input ref={pwRef} required type="password" name="pw" id="pw" />
        <button type='submit' className={css.btn}>로그인</button>
        <p className={css.sign}>아이디가 없다면? <Link to={'/sign'}>회원가입</Link></p>
      </form>
    </div>
  )
}
export default Login;
