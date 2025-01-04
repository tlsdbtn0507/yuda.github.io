import { dayMakerToPage } from 'utils/util'

import css from '../../css/main.module.css'

const DayMaker = () => {

  return (
    <p className={css.today}>{dayMakerToPage()}</p>
  )
}

export default DayMaker