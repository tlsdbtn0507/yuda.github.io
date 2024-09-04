import { DiaryType } from "../../model/interfaces";
import API from "../api"

export const getDiaries = async () => {
  try {
    const { data } = await API.get('/diary');
    return data;
  } catch (error) {
    throw new Error('다이러리 부르기 실패')
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