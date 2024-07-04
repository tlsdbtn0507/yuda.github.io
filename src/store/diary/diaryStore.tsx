import { create } from "zustand";
import { DiaryType } from "../../model/types";
import { fetchMoreDiaries } from "../../api/diary/diaryApi";

type DiaryStore = {
  diaries: DiaryType[],
  getDiaries: (arr: []) => void,
  getMoreDiaries:(id:number) => Promise<boolean>
}

export const diaryStore = create<DiaryStore>((set) => ({
  diaries: [],
  getDiaries: (arr: DiaryType[]) => set((state) => ({ ...state, diaries: arr })),
  getMoreDiaries: async (id: number) => {
    const res = await fetchMoreDiaries(id);
    if (res.length === 0) return false;
    else {
      set(state => ({ diaries: state.diaries.concat(res) }))
      return true
    }
  }
}))