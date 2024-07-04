import { create } from "zustand";

interface UserState  {
  pw: string,
  pwCheck: boolean,
  accessToken:string,
  setUserPw: (pw: string) => void,
  setUserPWCheck : (check:boolean) =>void
}

export const userStore = create<UserState>((set) => ({
  pw: '',
  pwCheck: false,
  accessToken:'',
  setUserPw: (pw) => set(state => ({ pw })),
  setUserPWCheck: (check) => set(state => ({ pwCheck: check })),
}))
