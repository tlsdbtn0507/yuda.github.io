import css from '../../css/loadingSpin.module.css'

const LoadingSpin = () => {
  return (
    <div className={css['lds-ring']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingSpin