import css from '../../css/diary.module.css'

const NullDiary = (props:{msg:string}) => {
  
  const { msg } = props;

  return (
    <div className={css.nullDiv}>
      <span className={css.nullMsg}>{msg}</span>
      <span className={css.nullMsg}>없습니다</ span>
    </div>
  )
};

export default NullDiary