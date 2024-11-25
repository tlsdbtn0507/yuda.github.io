import { whichObjIsEmpty } from "utils/util";
import { diaryStore } from "store/diary/diaryStore";
import { useEffect, useState } from "react";
import { userStore } from "store/user/userStore";

import css from "../../../../css/write.module.css";
import Selected from "./selected";
import UI from "constants/uiConstants";

const WriteSum = () => {
  const { isDiaryWritten } = diaryStore((state) => state);
  const { currentLoc, setCurrentLoc } = userStore((state) => state);
  const [showSelected, setShowSelected] = useState(false);

  useEffect(() => {
    if (whichObjIsEmpty(isDiaryWritten) === UI.DONE) setShowSelected(true);
  }, [isDiaryWritten, currentLoc, setCurrentLoc]);

  return (
    <div className={css.writeSumWrap}>
      <h2>{UI.WriteSumTsx.TODAY_HEADER}</h2>
      {showSelected && <Selected />}
    </div>
  );
};

export default WriteSum;
