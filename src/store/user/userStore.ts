import { getLocation } from "api/api";
import { create } from "zustand";

interface UserState  {
  pw: string,
  pwCheck: boolean,
  accessToken: string,
  currentLoc: { lat: string, long: string },
  setCurrentLoc: () => void,
  setUserPw: (pw: string) => void,
  setUserPWCheck : (check:boolean) =>void
}

export const userStore = create<UserState>((set) => ({
  pw: '',
  pwCheck: false,
  accessToken: '',
  currentLoc: { long: '', lat: '' },
  setCurrentLoc: async () => {
    const [lat,long] = await getLocation();
    set(state => ({ currentLoc: { lat, long } }));
  },
  setUserPw: (pw) => set(state => ({ pw })),
  setUserPWCheck: (check) => set(state => ({ pwCheck: check })),
}))
