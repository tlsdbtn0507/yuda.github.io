import CloseBtn from 'components/util/closeBtn';
import css from '../../../css/write.module.css'
import WriteSelect from './writeSelect';

const Write = () => {
  return (
    <div className={css.total}>
      <CloseBtn />
      <WriteSelect/>
    </div>
  )
};

export default Write