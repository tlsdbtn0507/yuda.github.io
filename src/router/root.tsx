import { useEffect } from 'react';
import Intro from '../components/intro';
import css from '../css/app.module.css';
import { Outlet, useLocation, useNavigation } from 'react-router';
import { Link } from 'react-router-dom';
import { diaryStore } from '../store/diary/diaryStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Root = () =>{
  const { pathname } = useLocation();
  
  const { writeDairy } = diaryStore(state => state);

  const setScreenSize = ()=> {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  
  useEffect(() => {
    setScreenSize();
  });

  const closeBtn = writeDairy &&
          <button className={css.closeBtn} >
            <FontAwesomeIcon className={css.closeBtnIcon} icon={faXmark}/>
          </button>

  return (
    <div className={css.app}>
      <Link className={css.h1} to={"/"}>
        <p className={writeDairy ? css.yuda20 : css.yuda}>
          {
            writeDairy ? '오늘의 일기를 작성해 봐요' : 'YuDa'
          }
        </p>
      </Link>
        {closeBtn}
      <main>
        <Outlet/>
      </main>
      {pathname === '/' && <Intro />}
      <div className={css.footer}></div>
    </div>
  );
}

export default Root