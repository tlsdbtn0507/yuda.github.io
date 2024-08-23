import Intro from '../components/intro';
import css from '../css/app.module.css';

import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { diaryStore } from '../store/diary/diaryStore';
import { faL } from '@fortawesome/free-solid-svg-icons';

const Root = () =>{
  const { pathname } = useLocation();
  
  const { writeDairy } = diaryStore(state => state);
  const [animated, setAnimated] = useState(false);

  const setScreenSize = ()=> {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  
  useEffect(() => {
    setScreenSize();
    if (writeDairy) {
      setAnimated(true);
    } else {
      setAnimated(false);
    }
    console.log(animated)
  },[writeDairy]);

  return (
    <div className={css.app}>
      <Link className={css.h1} to={"/"}>
        <p className={writeDairy ? css.yuda20 : css.yuda}>
          {
            writeDairy ? '오늘의 일기를 작성해 봐요' : 'YuDa'
          }
        </p>
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