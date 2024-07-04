import css from '../css/laTod.module.css'
import { diaryStore } from '../store/diary/diaryStore'
import Diary from './diary/diary'
import NullDiary from './diary/nullDiary';

const LastToday = () => {
  
  const { diaries } = diaryStore(state => state);
  
  let content = <p>fetching</p>;

  if (diaries.length !== 0) {
    const lastDiary = diaries[0];
    content = <Diary diaryInfo={lastDiary}/>
  } else {
    content = <NullDiary msg='작년의 오늘에 쓴 일기가'/>
  }

  return(
    <div className={css.total}>
      <h5 className={css.title}>작년의 오늘</h5>
      {content}
    </div>
  )
}

export default LastToday