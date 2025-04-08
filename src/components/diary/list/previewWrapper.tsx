import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { DiaryCameFromServer } from "model/interfaces";
import { previewContentArrayMaker } from "../../../utils/util";

import React, { act, useState } from "react";
import css from "../../../css/preview.module.css";
import CarouselBtns from "../../util/caroselBtn";
import SpecificWeather from "./specificWeather";

interface PreviewWrapperProps {
  diaryPreviewContent: DiaryCameFromServer
}

const PreviewWrapper: React.FC<PreviewWrapperProps> = ({ diaryPreviewContent }) => {
  
  const previewContents = previewContentArrayMaker(diaryPreviewContent);
  const currentContentArray = Object.values(previewContents);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState(`${css.contentText}`);

  const content = currentContentIndex === 2 ?
    <SpecificWeather animationDirection={animationDirection} specificWeather={previewContents.specificWeatherInDiary} /> :
    <p style={{ "--slide-x": "40%" } as React.CSSProperties}
      className={css.contentText + " " + animationDirection}>
      {currentContentArray[currentContentIndex] as string}
    </p>


  const carouselBtns =
    <div className={css.carouselBtnsWrapper}>
      {[0, 1, 2].map(e => <CarouselBtns id={`${e}`} key={e} isToggleBtn={ currentContentIndex === e } />)}
    </div>;
  

  const moveContentHandler = (direction: number) => {
    if (currentContentIndex + direction < 0) {
      return setCurrentContentIndex(2);
    }
    if (currentContentIndex + direction > 2) {
      return setCurrentContentIndex(0);
    }
    setCurrentContentIndex(currentContentIndex + direction);
  }

  const moveToRight = () => {
    setAnimationDirection(`${css["constent-slide-out-left"]}`);
    setTimeout(() => {
      moveContentHandler(1);
      setAnimationDirection(`${css["constent-slide-in-right"]}`);
    }, 400);
  };

  const moveToLeft = () => {

  }

  return (
    <div className={css.wrapper}>
      <div className={css.contentWrapper}>
        <button data-testid="sideBtns" className={css.sideBtns} onClick={moveToLeft}>
          <FontAwesomeIcon icon={faAngleLeft}/>
        </button>
        <div className={css.content}>
          { content }
          {carouselBtns}
        </div>
        {/* <button data-testid="sideBtns" className={css.sideBtns} onClick={() => activeClickHandler(1)}> */}
        <button data-testid="sideBtns" className={css.sideBtns} onClick={moveToRight}>
          <FontAwesomeIcon icon={faAngleRight}/>
        </button>
      </div>
    </div>
  )
}

export default PreviewWrapper;