import { DiaryCameFromServer, DiaryToSendToSurver, DiaryType } from "../../model/interfaces";

import ERROR from "constants/ErrorConstants";
import API from "../api";
import { isValidDay } from "utils/util";

export const fetchDiaries = async () => {
  try {
    const { data } = await API.get("/diary");
    //서버로 부터 온 일기의 값 중 요일(DayOfWeek)을 enum으로 변환 실패시 에러 발생
    const parsingDOWtoEnum = data.map((diary: DiaryCameFromServer) => {
      if (!isValidDay(diary.dayOfWeek)) {
        throw new Error(`Invalid dayOfWeek value: ${diary.dayOfWeek}`);
      }
      return {
        ...diary,
        dayOfWeek: isValidDay(diary.dayOfWeek),
      };
    })

    return parsingDOWtoEnum;
  } catch (error) {
    throw new Error(ERROR.FETCH_DIARY);
  }
};

export const fetchMoreDiaries = async (id: number): Promise<DiaryType[]> => {
  try {
    const { data } = await API.get(`/diary/${id}`);
    return data;
  } catch (error) {
    throw new Error();
  }
};

export const writeTodayDiary = async (diaryObject: DiaryToSendToSurver) => {
  try {
    const { data } = await API.post(`/diary`, diaryObject);
    return data;
  } catch (error) {
    throw new Error();
  }
};
