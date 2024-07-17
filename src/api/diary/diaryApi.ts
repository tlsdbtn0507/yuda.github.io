import { DiaryType } from "../../model/types";
import API from "../api"

export const getDiaries = async () => {

  try {
    const { data } = await API.get('/diary');
    return data;
  } catch (error) {
    throw new Error('다이어리 더 불러오는데 에러가 발생함')
  }
};

export const fetchMoreDiaries = async (id: number):Promise<DiaryType[]> => {
  try {
    const { data } = await API.get(`/diary/${id}`);
    return data
  } catch (error) {
    throw new Error()
  }
};