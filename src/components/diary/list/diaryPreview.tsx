import { DiaryCameFromServer } from "model/interfaces";

import React from "react";
import PreviewWrapper from "./previewWrapper";
import css from "../../../css/preview.module.css";

interface DiaryPreviewProps {
  diaryDetails:DiaryCameFromServer
}

const DiaryPreview: React.FC<DiaryPreviewProps> = ({ diaryDetails }) => {
  const { diaryDate, dayOfWeek } = diaryDetails;
  console.log(dayOfWeek);
  const dateContent = `${diaryDate.replaceAll("-", " . ")} ${dayOfWeek}`;

  return (
    <div data-testid="diaryPreview" className={css.diaryPreview}>
      <p className={css.diaryDate}>{dateContent}</p>
      <PreviewWrapper diaryPreviewContent={diaryDetails} data-testid="diaryPreviewWrapper"/>
    </div>
  )
}

export default DiaryPreview
