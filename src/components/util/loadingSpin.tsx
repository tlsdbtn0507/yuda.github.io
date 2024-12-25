import css from '../../css/loadingSpin.module.css'

const LoadingSpin = () => {
  return (
    <svg className={css.svg} viewBox="25 25 50 50">
      <circle className={css.circle} r="20" cy="50" cx="50"></circle>
    </svg>
  );
};

export default LoadingSpin