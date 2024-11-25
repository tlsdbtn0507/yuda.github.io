import { DiarySummary, DiaryType } from '../../model/interfaces'

import UI from 'constants/uiConstants';
import css from '../../css/diary.module.css'

const DUMMIES = {
  day: 'Tue',
  title: '얄리얄리',
  body: '얄랴셩얄라리얄라',
  url: '/logo192.png',
};
const { MONTH, DAY } = UI.DiaryTsx;

const DASH = "-";

const Diary = (props: { diaryInfo: DiaryType }) => {

  const { diaryInfo } = props;

  const diary: DiarySummary = {
    date: {
      date: `${new Date().getDate()}`,
      day: DUMMIES.day,
      month: `${new Date().getMonth() + 1}`,
    },
    content: {
      title: DUMMIES.title,
      body: DUMMIES.body
    },
    img: {
      url: DUMMIES.url
    }
  }

  const [, month, date] = diaryInfo.diaryDate.split(DASH);

  return (
    <div className={css.diary}>
      <div className={css.date}>
        <p>{month.padStart(2, UI.STRING_ZERO)}
          <span>{MONTH}</span>
        </p>
        <p>{date.padStart(2, UI.STRING_ZERO)}
          <span>{DAY}</span>
        </p>
      </div>
      <div className={css.content}>
      </div>
      <div className={css.img}>
        <img src={diary.img.url} alt={UI.EMPTY_STRING} />
      </div>
    </div>
  )
}

export default Diary