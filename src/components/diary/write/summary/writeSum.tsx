import css from '../../../../css/write.module.css'
import Selected from './selected'

const WriteSum = () => {

  return (
    <div className={css.writeSumWrap}>
      <h2>오늘 하루의</h2>
      <Selected />
    </div>
  )
}

export default WriteSum