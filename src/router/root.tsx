import { useEffect } from 'react';
import Intro from '../components/intro';
import css from '../css/app.module.css';
import { Outlet, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const Root = () =>{
  const {pathname} = useLocation();

  const setScreenSize = ()=> {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  
  useEffect(() => {
    setScreenSize();
  });

  return (
    <div className={css.app}>
        <Link className={css.h1} to={"/"}><p className={css.yuda}>YuDa</p></Link>
      <main>
        <Outlet/>
      </main>
      {pathname === '/' && <Intro />}
      <div className={css.footer}></div>
    </div>
  );
}

export default Root