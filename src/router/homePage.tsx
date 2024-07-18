import LastToday from '../components/lastToday'
import MyDiaries from '../components/myDiaries'
import Nav from '../components/nav/nav'
import DayMaker from '../components/util/dayMaker'
import css from '../css/main.module.css'

import { useQuery } from '@tanstack/react-query'
import { getDiaries } from '../api/diary/diaryApi'
import { diaryStore } from '../store/diary/diaryStore'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { tokenSet } from '../utils/util'

const HomePage = () => {

  const navigate = useNavigate();

  const { data, isError, error } = useQuery({
    queryKey: ['diaries'],
    queryFn: getDiaries,
    retry: 1
  });

  const { getDiaries: fetchingDiary } = diaryStore(state => state);

  const token = localStorage.getItem('refreshToken') as string;

  useEffect(() => {
    if (isError) {
      alert(error.message);
      navigate('/login');
      window.location.reload();
    } else {
      if (data) fetchingDiary(data);
      tokenSet(token);
    }

  }, [isError, data]);
  
  return (
    <>
      <div className={css.total}>
        <div className={css.wrapper}>
          <DayMaker/> 
          <LastToday/>
          <MyDiaries/>
        </div>
      </div>
      <Nav/>
    </>
  )
}

export default HomePage