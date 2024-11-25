import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/free-solid-svg-icons"

import css from '../../css/lowNav.module.css'

const NavBtn = (props: { icon: IconDefinition, p: string, onClick: () => void }) => {

  const { icon, p } = props;

  return (
    <>
      <button onClick={props.onClick}>
        <FontAwesomeIcon className={css.icon} icon={icon} />
        <p className={css.btnP}>{p}</p>
      </button>
    </>
  )
}

export default NavBtn