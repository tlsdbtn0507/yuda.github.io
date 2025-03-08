import { Days } from "model/interfaces";

export const TEST = {
  DUMMI_DIARY_DATA:{
    id: 4,
    feeling: { ment: "완전 행복!", level: 3 },
    weather: {
      weatherCond: "화창 했어",
      weatherLevel: { ment: "너무!", level: 3 },
    },
    feelingReason: "테스트입니다",
    dayOfWeek: "Mon" as Days,
    diaryDate: "2025-03-03",
    lat: "37.566000",
    long: "126.978400",
    humidity: "47",
    rainAmount: "0",
    rainCod: "0",
    temp: "1.8",
  }
}

export default TEST;

