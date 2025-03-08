import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import React from "react";
import css from "../../../css/preview.module.css";
import CarouselBtns from "../../util/caroselBtn";

const PreviewWrapper = (props: any) => {

  const content = <p className={css.contentText}>완전 더웠던 하루</p>;

  const carouselBtns =
    <div className={css.carouselBtnsWrapper}>
      {[0, 1, 2, 3].map(e => <CarouselBtns id={`${e}`} key={e} />)}
    </div>

  return (
    <div {...props} className={css.wrapper}>
      <div className={css.contentWrapper}>
        <button data-testid="sideBtns" className={css.sideBtns}>
          <FontAwesomeIcon icon={faAngleLeft}/>
        </button>
        <div className={css.content}>
          {content}
          {carouselBtns}
        </div>
        <button data-testid="sideBtns" className={css.sideBtns}>
          <FontAwesomeIcon icon={faAngleRight}/>
        </button>
      </div>
    </div>
  )
}

export default PreviewWrapper;