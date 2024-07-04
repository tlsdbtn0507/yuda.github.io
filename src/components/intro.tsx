import { redirect, useNavigate } from 'react-router';
import css from '../css/app.module.css';

const Intro = () =>{
  const navigate = useNavigate()

  const goToMain = () =>{
    navigate('login')
  }
  return(
    <>
      <section className={css.section}>
          <p>주저리 주저리</p>
          <p>주절 주절</p>
          <p>대충 일기 앱이다 이거야~</p>
      </section>
      <button onClick={goToMain} className={css.button}>시작하기</button>
    </>
  )
}

export default Intro;