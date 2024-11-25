import UI from 'constants/uiConstants';
import css from '../../css/diary.module.css'

const NullDiary = (props: { msg: string }) => {

  const { msg } = props;

  return (
    <div className={css.nullDiv}>
      <span className={css.nullMsg}>{msg}</span>
      <span className={css.nullMsg}>{UI.NullDiaryTsx.NONE}</ span>
    </div>
  )
};

export default NullDiary