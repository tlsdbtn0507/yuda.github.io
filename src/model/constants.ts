import { WriteDiary, WriteDiaryFeeling, WriteDiaryWeather } from "./interfaces";
import UI from "constants/uiConstants";

export const FEELINGS: WriteDiaryFeeling[] = [
  {
    ment: "완전 행복!",
    level: 3,
  },
  {
    ment: "그냥 그랬어",
    level: 2,
  },
  {
    ment: "별로..",
    level: 1,
  },
];

export const WEATHER_LEVELS: WriteDiaryFeeling[] = [
  { ment: "너무!", level: 3 },
  { ment: "보통 ", level: 2 },
  { ment: "쪼금!", level: 1 },
];

export const WEATHERS: WriteDiaryWeather[] = [
  {
    weatherCond: "화창 했어",
    weatherLevel: [],
  },
  {
    weatherCond: "비가 왔어",
    weatherLevel: [],
  },
  {
    weatherCond: "눈이 왔어",
    weatherLevel: [],
  },
  {
    weatherCond: "더웠어",
    weatherLevel: [],
  },
  {
    weatherCond: "따뜻했어",
    weatherLevel: [],
  },
  {
    weatherCond: "추웠어",
    weatherLevel: [],
  },
  {
    weatherCond: "우중충 했어",
    weatherLevel: [],
  },
];

export const WRITING_DIARY: WriteDiary = {
  feeling: {},
  weather: {},
  feelingReason: UI.EMPTY_STRING,
};
