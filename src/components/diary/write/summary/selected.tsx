import css from '../../../../css/write.module.css'

const Selected = () => {



  const submitDiary = () => { };

  return (
    <div className={css.selected}>
      {/* {selectedMaker} */}
      <button className={css.sumDoneBtn} onClick={submitDiary}>끝내기!</button>
    </div>
  )
}

export default Selected