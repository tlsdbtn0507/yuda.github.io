import { useNavigate } from 'react-router';

import APIS from 'constants/apiConstants';
import css from '../css/app.module.css';
import UI from 'constants/uiConstants';

const { INTRO_P_TEXTS, START } = UI.IntroTsx;

const Intro = () => {
  const navigate = useNavigate()

  const goToMain = () => {
    navigate(APIS.ROUTES.LOGIN);
  };

  const texts = INTRO_P_TEXTS.map(text => <p key={text}>{text}</p>);

  return (
    <>
      <section className={css.section}>
        {texts}
      </section>
      <button onClick={goToMain} className={css.button}>{START}</button>
    </>
  )
}

export default Intro;