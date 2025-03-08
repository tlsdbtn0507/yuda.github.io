import React from "react";
import PreviewWrapper from "./previewWrapper";
import css from "../../../css/preview.module.css";
import { DiaryCameFromServer } from "model/interfaces";

interface DiaryPreviewProps {
  diaryDetails:DiaryCameFromServer
}

const DiaryPreview:React.FC<DiaryPreviewProps> = ({diaryDetails}) => {
  return (
    <div data-testid="diaryPreview" className={css.diaryPreview}>
      <p className={css.diaryDate}>2023 . 12 . 22</p>
      <PreviewWrapper data-testid="diaryPreviewWrapper"/>
    </div>
  )
}

export default DiaryPreview
