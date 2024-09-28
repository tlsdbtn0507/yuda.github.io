import css from '../../../../css/write.module.css'
import RemindBtn from './remindBtn'

const Selected = () => {


  return (
    <div className={css.selected}>
      <p>기분은</p>
      <RemindBtn />
      <p>기분은</p>
      <RemindBtn />
      <p>기분은</p>
      <RemindBtn />
      <button className={css.sumDoneBtn}>끝내기!</button>
    </div>
  )
}

export default Selected