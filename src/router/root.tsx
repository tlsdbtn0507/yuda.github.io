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


  const setScreenSize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  const aniSetter = (str:string) => {
    setAnimating(true);
     // 애니메이션이 끝난 후에 writeDairy 상태 변경
    setTimeout(() => {
      setDisplayText(str);
      setAnimating(false);
    }, 800);     
  };

  const animaCssClass =
    `${writeDairy ? css.ment : css.yuda} ${animating ? css.animating : ''}`;
  
  const linkCssClass = writeDairy ? css.h1 : css.h2
  
  useEffect(() => {
    writeDairy ? aniSetter('오늘의 일기를 작성해 봐요') : aniSetter('YuDa');
    setScreenSize()
  },[writeDairy]);

  return (
    <div className={css.app}>
      <Link className={linkCssClass} to={"/"}>
        <p className={animaCssClass}> {displayText}</p>
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