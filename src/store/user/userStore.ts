import { getLocation } from "api/api";
import { create } from "zustand";
import { handleAlertPerDevice } from "utils/util";

import UI from "constants/uiConstants";
import ERROR from "constants/ErrorConstants";

interface UserState {
  pw: string;
  pwCheck: boolean;
  accessToken: string;
  currentLoc: { lat: string; long: string };
  setCurrentLoc: () => Promise<void>;
  setUserPw: (pw: string) => void;
  setUserPWCheck: (check: boolean) => void;
}

const { EMPTY_STRING } = UI;

export const userStore = create<UserState>((set) => ({
  pw: EMPTY_STRING,
  pwCheck: false,
  accessToken: EMPTY_STRING,
  currentLoc: { long: EMPTY_STRING, lat: EMPTY_STRING },
  setCurrentLoc: async () => {
    try {
      const [lat, long] = await getLocation();
      set((state) => ({ currentLoc: { lat, long } }));
    } catch (error) {
      handleAlertPerDevice(ERROR.FAIL_TO_FETCH_LOC);
    }
  },
  setUserPw: (pw) => set((state) => ({ pw })),
  setUserPWCheck: (check) => set((state) => ({ pwCheck: check })),
}));
