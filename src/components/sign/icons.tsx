import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const Icons = (props: { isInit: boolean ,isVal:boolean}) => {
  
  const { isInit, isVal } = props;

  return (
    isInit ? <FontAwesomeIcon icon = { faCircleCheck } style = {{ color: 'white' }} />
    : isVal ?
      <FontAwesomeIcon icon={faCircleCheck} style={{color: "rgba(87, 245, 255, 1)",
            opacity: isInit ? 0 : 1}} /> :
      <FontAwesomeIcon icon={faCircleXmark} style={{ color: "red" }} />
  )

}

export default Icons