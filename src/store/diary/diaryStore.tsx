import { create } from "zustand";
import { DiaryType, IsDiaryWritten } from "../../model/interfaces";
import { fetchMoreDiaries } from "../../api/diary/diaryApi";

type DiaryStore = {
  diaries: DiaryType[],
  isWritingDairy: boolean,
  isDiaryWritten:IsDiaryWritten,
  toggleWriteDairy: (tog: boolean) => void,
  getDiaries: (arr: []) => void,
  getMoreDiaries: (id: number) => Promise<boolean>,
  setWritingDiary: (writingDiary: IsDiaryWritten) => void,
  but: number,
  isButWork:()=>void
}

export const diaryStore = create<DiaryStore>((set) => ({
  diaries: [],
  isWritingDairy: false,
  isDiaryWritten: JSON.parse(localStorage.getItem('writingDiary') as string),
  // isDiaryWritten:null,
  but: 1,
  isButWork:()=>set(state=>({but:state.but+=1})),
  toggleWriteDairy: (tog: boolean) => {
    window.scrollTo(0, 0)
    set(state => ({ isWritingDairy: tog }))
  },
  getDiaries: (arr: DiaryType[]) => set((state) => ({ ...state, diaries: arr })),
  getMoreDiaries: async (id: number) => {
    const res = await fetchMoreDiaries(id);
    if (res.length === 0) return false;
    else {
      set(state => ({ diaries: state.diaries.concat(res) }))
      return true
    }
  },
  setWritingDiary: (writingDiary:IsDiaryWritten) => {
    localStorage.setItem('writingDiary', JSON.stringify(writingDiary));
    set(state => ({ isDiaryWritten: writingDiary }));
  },
}));