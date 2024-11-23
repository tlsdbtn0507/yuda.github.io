import { whichObjIsEmpty } from "utils/util";
import css from "../../../../css/write.module.css";
import Selected from "./selected";
import { diaryStore } from "store/diary/diaryStore";
import { useEffect, useState } from "react";
import { userStore } from "store/user/userStore";

const WriteSum = () => {
  const { isDiaryWritten } = diaryStore((state) => state);
  const { currentLoc, setCurrentLoc } = userStore((state) => state);
  const [showSelected, setShowSelected] = useState(false);

  useEffect(() => {
    if (whichObjIsEmpty(isDiaryWritten) === "done") setShowSelected(true);
  }, [isDiaryWritten, currentLoc, setCurrentLoc]);

  return (
    <div className={css.writeSumWrap}>
      <h2>오늘 하루의</h2>
      {showSelected && <Selected />}
    </div>
  );
};

export default WriteSum;
