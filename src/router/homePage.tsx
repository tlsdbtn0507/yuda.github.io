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
import { userStore } from 'store/user/userStore'
import { isEmptyObj } from 'utils/util'

const HomePage: React.FC = () => {

  const navigate = useNavigate();

  const { data, isError, error } = useQuery({
    queryKey: ['diaries'],
    queryFn: getDiaries,
  });

  const { getDiaries: fetchingDiary, toggleWriteDairy, isWritingDairy } =
    diaryStore(state => state);

  const { setCurrentLoc, currentLoc } = userStore(state => state);

  const currentLocDiaries = !isEmptyObj(currentLoc) && <p>지금 위치에 있던 기록들</p>;

  useEffect(() => {
    if (isError) {
      alert(error.message);
      navigate('/login');
      window.location.reload();
    } else {
      if (data) fetchingDiary(data);
    }

    setCurrentLoc();

  }, [isError, data]);

  return (
    <>
      <div className={`${css.total} ${isWritingDairy ? css.expand : css.home}`}>
        {
          isWritingDairy ? <Write /> :
            <div className={css.wrapper}>
              <DayMaker />
              <LastToday />
              <MyDiaries />
              {currentLocDiaries}
            </div>
        }
      </div>
      {!isWritingDairy && <Nav onDiaryClick={() => toggleWriteDairy(true)} />}
    </>
  )
}

export default HomePage