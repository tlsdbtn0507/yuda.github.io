import { DiaryCameFromServer } from "model/interfaces";

import React from "react";
import PreviewWrapper from "./previewWrapper";
import css from "../../../css/preview.module.css";

interface DiaryPreviewProps {
  diaryDetails: DiaryCameFromServer,
  style: React.CSSProperties
}

const DiaryPreview: React.FC<DiaryPreviewProps> = ({ diaryDetails, style }) => {
  const { diaryDate, dayOfWeek } = diaryDetails;
  const dateContent = `${diaryDate.replaceAll("-", " . ")} ${dayOfWeek}`;

  return (
    <div style={style} data-testid="diaryPreview" className={css.diaryPreview}>
      <p className={css.diaryDate}>{dateContent}</p>
      <PreviewWrapper diaryPreviewContent={diaryDetails} data-testid="diaryPreviewWrapper"/>
    </div>
  )
}

export default DiaryPreview
