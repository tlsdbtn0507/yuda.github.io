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
import { tokenSet } from '../utils/util'

const HomePage:React.FC = () => {
  const [expend, setExpend] = useState(false);

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
      <div className={css.totalHome}>
        <div className={css.wrapper}>
          <DayMaker/> 
          <LastToday/>
          <MyDiaries/>
        </div>
      </div>
      <Nav onDiaryClick={()=>setExpend(!expend)}/>
    </>
  )
}

export default HomePage