import { DiaryType } from "../../model/interfaces";

import ERROR from "constants/ErrorConstants";
import API from "../api";

export const getDiaries = async () => {
  try {
    const { data } = await API.get("/diary");
    return data;
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
