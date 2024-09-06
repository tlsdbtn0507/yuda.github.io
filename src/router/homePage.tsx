import LastToday from '../components/lastToday'
import MyDiaries from '../components/myDiaries'
import Nav from '../components/nav/nav'
import DayMaker from '../components/util/dayMaker'
import Write from '../components/diary/write/write'
import css from '../css/main.module.css'

import { useQuery } from '@tanstack/react-query'
import { getDiaries } from '../api/diary/diaryApi'
import { diaryStore } from '../store/diary/diaryStore'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const HomePage:React.FC = () => {

  const navigate = useNavigate();

  const { data, isError, error } = useQuery({
    queryKey: ['diaries'],
    queryFn: getDiaries,
  });

  const { getDiaries: fetchingDiary, toggleWriteDairy, isWritingDairy } =
    diaryStore(state => state);


  useEffect(() => {
    if (isError) {
      alert(error.message);
      navigate('/login');
      window.location.reload();
    } else {
      if (data) fetchingDiary(data);
    }

  }, [isError, data]);

  return (
    <>
      <div className={`${css.total} ${isWritingDairy ? css.expand : css.home}`}>
        {
          isWritingDairy ? <Write/>:
          <div className={css.wrapper}>
            <DayMaker/> 
            <LastToday/>
            <MyDiaries/>
          </div>
        }
      </div>
      { !isWritingDairy && <Nav onDiaryClick={()=>toggleWriteDairy(true)} /> }
    </>
  )
}

export default HomePage