import { whichObjIsEmpty } from "utils/util";
import { diaryStore } from "store/diary/diaryStore";

import css from "../../../../css/write.module.css";
import Selected from "./selected";
import UI from "constants/uiConstants";

const WriteSum = () => {
  const { isDiaryWritten } = diaryStore((state) => state);

  return (
    <div className={css.writeSumWrap}>
      <h2>{UI.WriteSumTsx.TODAY_HEADER}</h2>
      {whichObjIsEmpty(isDiaryWritten) === UI.DONE && <Selected />}
    </div>
  );
};

export default WriteSum;
