import css from '../../../../css/write.module.css'
import Selected from './selected'

const WriteSum = () => {

  return (
    <div className={css.writeSumWrapper}>
      <h2>오늘 하루는</h2>
      <Selected />
    </div>
  )
}

export default WriteSum