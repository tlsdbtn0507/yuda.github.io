import { useEffect } from 'react';
import Intro from '../components/intro';
import css from '../css/app.module.css';
import { Outlet, useLocation, useNavigation } from 'react-router';
import { Link } from 'react-router-dom';

const Root = () =>{
  const { pathname } = useLocation();
  

  const setScreenSize = ()=> {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  
  useEffect(() => {
    setScreenSize();
  });

  const mentCondition = pathname === '/write';

  return (
    <div className={css.app}>
      <Link className={css.h1} to={"/"}>
        <p className={mentCondition ? css.yuda : css.yuda20}>YuDa</p>
        {mentCondition && <p className={css.diaryMent}>오늘의 일기를 작성해 봐요</p>}
      </Link>
      <main>
        <Outlet/>
      </main>
      {pathname === '/' && <Intro />}
      <div className={css.footer}></div>
    </div>
  );
}

export default Root