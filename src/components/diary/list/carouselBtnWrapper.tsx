import React from "react";
import css from "../../../css/preview.module.css";
import CarouselBtns from "components/util/caroselBtn";

const CarouselBtnsWrapper = () => {
  
  return (
    <div className={css.carouselBtnsWrapper}>
      {[0, 1, 2, 3].map(e => <CarouselBtns id={`${e}`} key={e} />)}
    </div>
  )
}

export default CarouselBtnsWrapper;