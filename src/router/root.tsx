import Intro from '../components/intro';
import css from '../css/app.module.css';

import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { diaryStore } from '../store/diary/diaryStore';

const Root = () =>{
  const { pathname } = useLocation();
  
  const { writeDairy } = diaryStore(state => state);
  const [animating, setAnimating] = useState(false);
  const [displayText, setDisplayText] = useState('YuDa');


  const setScreenSize = ()=> {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  
  useEffect(() => {
    if (writeDairy) {
      setAnimating(true);
      // 애니메이션이 끝난 후에 writeDairy 상태 변경
      setTimeout(() => {
        setDisplayText('오늘의 일기를 작성해 봐요');
        setAnimating(false);
      }, 800); 
    } else {
      setAnimating(true);
      setTimeout(() => {
        setDisplayText('YuDa');
        setAnimating(false);
      }, 800); 
    }
    setScreenSize()
  },[writeDairy]);

  return (
    <div className={css.app}>
      <Link className={css.h1} to={"/"}>
        <p className=
          {`${writeDairy ? css.yuda20 : css.yuda} ${animating ? css.animating : ''}`}>
          {/* { writeDairy ? '오늘의 일기를 작성해 봐요' : 'YuDa'} */}
          {displayText}
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