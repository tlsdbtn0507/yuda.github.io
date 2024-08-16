import LastToday from '../components/lastToday'
import MyDiaries from '../components/myDiaries'
import Nav from '../components/nav/nav'
import DayMaker from '../components/util/dayMaker'
import css from '../css/main.module.css'

import { useQuery } from '@tanstack/react-query'
import { getDiaries } from '../api/diary/diaryApi'
import { diaryStore } from '../store/diary/diaryStore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Write from './write'

const HomePage:React.FC = () => {
  const [expand, setExpend] = useState(false);

  const navigate = useNavigate();

  const { data, isError, error } = useQuery({
    queryKey: ['diaries'],
    queryFn: getDiaries,
  });

  const { getDiaries: fetchingDiary } = diaryStore(state => state);

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
      <div
        className={`${css.total} ${expand ? css.expand : css.home}`}
        onClick={()=>setExpend(false)} >
        {
          expand ?
            <Write/>:
          <div className={css.wrapper}>
            <DayMaker/> 
            <LastToday/>
            <MyDiaries/>
          </div>
        }
      </div>
      { !expand && <Nav onDiaryClick={()=>setExpend(true)} /> }
    </>
  )
}

export default HomePage