import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { diaryStore } from '../store/diary/diaryStore';

import Intro from '../components/intro';
import css from '../css/app.module.css';
import UI from 'constants/uiConstants';
import APIS from 'constants/apiConstants';

const { ROUTES: { HOME }, TIMEOUT: { ANIMATION: { ROOT } } } = APIS;
const { YUDA, SUGGEST_WRITE } = UI.RootTsx.HEADER;
const UNDEFINED_STRING = "undefined";

const Root = () => {
  const { pathname } = useLocation();

  const { isWritingDairy } = diaryStore(state => state);

  const [animating, setAnimating] = useState(false);
  const [displayText, setDisplayText] = useState(YUDA);
  const [innerHeight, setInnerHeight] = useState<Number>(0);

  const aniSetter = (str: string) => {
    setAnimating(true);
    // 애니메이션이 끝난 후에 isWritingDairy 상태 변경
    setTimeout(() => {
      setDisplayText(str);
      setAnimating(false);
    }, ROOT);
  };

  const animaCssClass =
    `${isWritingDairy ? css.ment : css.yuda} ${animating ? css.animating : UI.EMPTY_STRING}`;

  const linkCssClass = isWritingDairy ? css.h1 : css.h2

  useEffect(() => {

    isWritingDairy ? aniSetter(SUGGEST_WRITE) : aniSetter(YUDA);

    if (typeof window !== UNDEFINED_STRING) setInnerHeight(window.innerHeight);

  }, [isWritingDairy, innerHeight]);

  return (
    <div className={css.app} style={{ height: `${innerHeight}px` }}>
      <Link className={linkCssClass} to={HOME}>
        <p className={animaCssClass}> {displayText}</p>
      </Link>
      <main>
        <Outlet />
      </main>
      {pathname === HOME && <Intro />}
      <div className={css.footer}></div>
    </div>
  );
}

export default Root