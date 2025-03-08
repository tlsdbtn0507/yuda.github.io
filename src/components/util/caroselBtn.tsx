import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import React from "react";
import css from "../../css/preview.module.css"

const CarouselBtns = (props: { id: string }) => {

  return (
    <button data-testid={"carouselBtns"} className={css.carouselBtns} id={props.id}>
      <FontAwesomeIcon icon={faCircle} />
    </button>
  )
}

export default CarouselBtns;
