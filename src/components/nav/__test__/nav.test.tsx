import { Days, DiaryToSendToSurver } from "model/interfaces";
import * as utilModule from "../../../utils/util"; // 이렇게 변경
import { checkIsDiaryToUpdate } from "../nav";
import { writeTodayDiary } from "api/diary/diaryApi";

jest.mock("../../../constants/uiConstants", () => ({
  DONE: "done",
  WriteDoneBtnTsx: { MARKS: {} },
  NavTsx: {
    CONFIRM_LOGOUT: "mocked_confirm_logout",
    TODAY_DIARY: "mocked_today_diary",
    WRITE_DIARY: "mocked_write_diary",
    LOGOUT: "mocked_logout",
  },
}));

jest.mock("../../../constants/ErrorConstants", () => ({
  ERROR: {},
}));

jest.mock("../../../api/diary/diaryApi", () => ({
  writeTodayDiary: jest.fn(),
}));

describe("Nav 컴포넌트의 checkIsDiaryToUpdate 함수 흐름 테스트", () => {
  let removeItemSpy: jest.SpyInstance;

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    removeItemSpy = jest.spyOn(Storage.prototype, "removeItem");
  });

  it("오늘 날짜와 다른 일기 + 작성상태가 done이면 writeTodayDiary 호출 후 localStorage 삭제", () => {
    const writingDiary:DiaryToSendToSurver = {
      diaryDate: "2022-01-01",
      feeling: { ment: "완전 행복!", level: 3 },
      weather: { weatherCond: "화창했어", weatherLevel: { ment: "너무!", level: 3 } },
      feelingReason: "",
      lat: "0",
      long: "0",
      dayOfWeek: Days.MON,
    };

    jest.spyOn(utilModule, "dayMakerToSend").mockReturnValue("2025-04-25");
    jest.spyOn(utilModule, "whichObjIsEmpty").mockReturnValue("done");

    checkIsDiaryToUpdate(writingDiary);

    expect(writeTodayDiary).toHaveBeenCalledWith(writingDiary);
    expect(removeItemSpy).toHaveBeenCalledWith("writingDiary");
  });

  it("오늘 날짜와 다른 일기 + 작성상태가 done이 아니면 writeTodayDiary 호출 안함", () => {
    const writingDiary: DiaryToSendToSurver = {
      diaryDate: "2022-01-01",
      feeling: { ment: "완전 행복!", level: 3 },
      weather: { weatherCond: "화창했어", weatherLevel: { ment: "너무!", level: 3 } },
      feelingReason: "",
      lat: "0",
      long: "0",
      dayOfWeek: Days.THU,
    };

    jest.spyOn(utilModule, "dayMakerToSend").mockReturnValue("2025-04-25");
    jest.spyOn(utilModule, "whichObjIsEmpty").mockReturnValue("not_done");

    checkIsDiaryToUpdate(writingDiary);

    expect(writeTodayDiary).not.toHaveBeenCalled();
    expect(removeItemSpy).toHaveBeenCalled();
  });

  it("오늘 날짜와 같은 일기면 writeTodayDiary 호출 안함", () => {
    const writingDiary: DiaryToSendToSurver = {
      diaryDate: "2025-04-25",
      feeling: { ment: "완전 행복!", level: 3 },
      weather: { weatherCond: "화창했어", weatherLevel: { ment: "너무!", level: 3 } },
      feelingReason: "",
      lat: "0",
      long: "0",
      dayOfWeek: Days.MON,
    };

    jest.spyOn(utilModule, "dayMakerToSend").mockReturnValue("2025-04-25");

    checkIsDiaryToUpdate(writingDiary);

    expect(writeTodayDiary).not.toHaveBeenCalled();
    expect(removeItemSpy).not.toHaveBeenCalled();
  });

});