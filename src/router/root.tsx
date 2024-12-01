import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { diaryStore } from '../store/diary/diaryStore';

import Intro from '../components/intro';
import css from '../css/app.module.css';
import UI from 'constants/uiConstants';
import APIS from 'constants/apiConstants';

const {
  ROUTES: { ROOT, MAIN },
  TIMEOUT: { ANIMATION: { AT_ROOT } },
  IS_USER_LOGINED_STR
} = APIS;
const { YUDA, SUGGEST_WRITE } = UI.RootTsx.HEADER;
const TOTAL_HEIGHT = '100vh';

const Root = () => {
  const { pathname } = useLocation();

  const { isWritingDairy } = diaryStore(state => state);

  const [animating, setAnimating] = useState(false);
  const [displayText, setDisplayText] = useState(YUDA);
  const [innerHeight, setInnerHeight] = useState<Number>(0);

  const navigate = useNavigate();

  const aniSetter = (str: string) => {
    setAnimating(true);
    // 애니메이션이 끝난 후에 isWritingDairy 상태 변경
    setTimeout(() => {
      setDisplayText(str);
      setAnimating(false);
    }, AT_ROOT);
  };

  const animaCssClass =
    `${isWritingDairy ? css.ment : css.yuda} ${animating ? css.animating : UI.EMPTY_STRING}`;

  const linkCssClass = isWritingDairy ? css.h1 : css.h2;

  const toRootOrMain = useCallback(() => {
    const isLogined = localStorage.getItem(IS_USER_LOGINED_STR);
    if (isLogined) {
      return MAIN;
    }
    return ROOT;
  }, []);

  useEffect(() => {
    navigate(toRootOrMain());

    if (isWritingDairy) return aniSetter(SUGGEST_WRITE);

    setInnerHeight(window.innerHeight);

    return aniSetter(YUDA);

  }, [isWritingDairy, innerHeight, navigate, toRootOrMain]);

  return (
    <div className={css.app} style={{ height: TOTAL_HEIGHT }}>
      <Link className={linkCssClass} to={toRootOrMain()}>
        <p className={animaCssClass}> {displayText}</p>
      </Link>
      <main>
        <Outlet />
      </main>
      {pathname === ROOT && <Intro />}
      <div className={css.footer}></div>
    </div>
  );
}

export default Root