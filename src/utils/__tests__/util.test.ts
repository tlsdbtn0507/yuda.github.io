import { SelectedDiaryWeahter } from "model/interfaces";
import { feelingPreviewMaker, weatherPreviewMaker } from "../util";

describe("util파일의 함수들 테스트", () => {
  test("feelingPreviewMaker함수가 올바른 문자열을 뱉는가?", () => {
    expect(feelingPreviewMaker({ ment: '별로..', level: 1 })).toBe("별로 였던 하루");
    expect(feelingPreviewMaker({ ment: '그냥 그랬어', level: 2 })).toBe("그냥 그랬던 하루");
    expect(feelingPreviewMaker({ ment: '완전 행복', level: 3 })).toBe("완전 행복했던 하루");
  });

  test("feelingPreviewMaker함수가 잘못된 문자열을 뱉는가?", () => {
    expect(feelingPreviewMaker({ ment: '별로..', level: 1 })).not.toBe("별로 했던 하루");
    expect(feelingPreviewMaker({ ment: '그냥 그랬어', level: 2 })).not.toBe("그냥 그랬었던 하루");
    expect(feelingPreviewMaker({ ment: '완전 행복', level: 3 })).not.toBe("완전 행복던 하루");
  });

  const TEST_WEATHER_COLD_3 : SelectedDiaryWeahter = { weatherCond: "추웠어", weatherLevel: { ment: "너무!", level: 3 } };
  const TEST_WEATHER_HOT_2 : SelectedDiaryWeahter = { weatherCond: "더웠어", weatherLevel: { ment: "보통", level: 2 } };
  const TEST_WEATHER_SUN_1: SelectedDiaryWeahter = { weatherCond: "화창했어", weatherLevel: { ment: "쪼금!", level: 1 } };
  const TEST_WEATHER_RAIN_1: SelectedDiaryWeahter = { weatherCond: "비가 왔어", weatherLevel: { ment: "쪼금!", level: 1 } };

  test("weatherPreviewMaker함수가 올바른 문자열을 뱉는가?", () => {
    
    expect(weatherPreviewMaker(TEST_WEATHER_COLD_3)).toBe("너무 추웠던 하루");
    expect(weatherPreviewMaker(TEST_WEATHER_HOT_2)).toBe("더웠던 하루");
    expect(weatherPreviewMaker(TEST_WEATHER_SUN_1)).toBe("쪼금 화창했던 하루");
    expect(weatherPreviewMaker(TEST_WEATHER_RAIN_1)).toBe("비가 쪼금 왔던 하루");
  })

  test("weatherPreviewMaker함수가 잘못된 문자열을 뱉는가?", () => {
    expect(weatherPreviewMaker(TEST_WEATHER_COLD_3)).not.toBe("너무 추웠 하루");
    expect(weatherPreviewMaker(TEST_WEATHER_HOT_2)).not.toBe("보통 더웠던 하루");
    expect(weatherPreviewMaker(TEST_WEATHER_SUN_1)).not.toBe("약간 화창했던 하루");
    expect(weatherPreviewMaker(TEST_WEATHER_RAIN_1)).not.toBe("비가  왔던 하루");
  });

});