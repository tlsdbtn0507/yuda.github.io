import { diaryStore } from 'store/diary/diaryStore';
import css from '../../../../css/write.module.css'
import RemindBtn from './remindBtn'
import { SelectedDiaryWeahter, WriteDiaryEnum, WriteDiaryFeeling } from 'model/interfaces';

const Selected = () => {

  const titles = ['기분은', '날씨는', '기록은'];

  const { isDiaryWritten } = diaryStore(state => state);

  const selectedMaker = titles.map((e, i) => {
    let toReturn = { title: '', type: '' };
    switch (i) {
      case 0:
        const { ment: fMent } = isDiaryWritten.feeling as WriteDiaryFeeling;
        toReturn.title = fMent;
        toReturn.type = WriteDiaryEnum.Feeling;
        break;

      case 1:
        const { weatherCond, weatherLevel: { ment: wMent, level } } =
          isDiaryWritten.weather as SelectedDiaryWeahter;

        const weatherLevelCond = level === 2 ? '' : wMent.slice(0, -1);

        toReturn.title = `${weatherLevelCond} ${weatherCond}`;
        toReturn.type = WriteDiaryEnum.Weather;
        break;

      case 2:
        const { feelingReason } = isDiaryWritten;
        toReturn.title = feelingReason as string;
        toReturn.type = WriteDiaryEnum.FeelingReason;
        break;
      default:
        break;
    }
    return (
      <div key={i}>
        <p>{e}</p>
        <RemindBtn content={toReturn} />
      </div>
    )
  })

  return (
    <div className={css.selected}>
      {selectedMaker}
      <button className={css.sumDoneBtn}>끝내기!</button>
    </div>
  )
}

export default Selected