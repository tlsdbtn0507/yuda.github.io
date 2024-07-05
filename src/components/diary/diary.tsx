import css from '../../css/diary.module.css'
import { DiarySummary, DiaryType } from '../../model/types'

const Diary = (props: { diaryInfo: DiaryType }) => {
  
  const { diaryInfo } = props;

  const diary:DiarySummary = {
    date:{
      date: `${new Date().getDate()}`,
      day:'Tue',
      month:`${new Date().getMonth()+1}`,
    },
    content:{
      title:'얄리얄리',
      body:'얄랴셩얄라리얄라'
    },
    img:{
      url:'/logo192.png'
    }
  }

  const  [_, month  , date]  = diaryInfo.diaryDate.split('-');


  return(
    <div className={css.diary}>
      <div className={css.date}>
        <p>{diaryInfo.diaryDay}</p>
        <p>{month[0] === '0' ? month[1] : month}<span>월</span> </p>
        <p>{date[0] === '0' ? date[1] : date}<span>일</span></p>
      </div>
      <div className={css.content}>
        <p>{diaryInfo.diaryTitle}</p>
      </div>
      <div className={css.img}>
        <img src={diary.img.url} alt=''/>
      </div>
    </div>
  )
}

export default Diary