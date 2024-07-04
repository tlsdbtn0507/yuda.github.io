import css from '../../css/main.module.css'

const DayMaker = () => {

    const daymaker = () =>{
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const date = new Date().getDate();
    const day = new Date().getDay();

    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

    return `${year} . ${month+1} . ${date} . ${days[day]}`
  }

  return (
    <p className={css.today}>{daymaker()}</p>
  )
}

export default DayMaker