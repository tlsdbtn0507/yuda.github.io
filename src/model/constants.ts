import {
  IsDiaryWritten,
  WriteDiaryFeeling,
  WriteDiaryWeather,
} from "./interfaces";
import UI from "../constants/uiConstants";

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
    weatherCond: "화창했어",
    weatherLevel: [],
  },
  {
    weatherCond: "비가왔어",
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
    weatherCond: "우중충했어",
    weatherLevel: [],
  },
];

export const WRITING_DIARY: IsDiaryWritten = {
  feeling: {},
  weather: {},
  feelingReason: UI.EMPTY_STRING,
  diaryDate: "",
};

export const RAIN_COND_ARR:string[][] = [
  ["0", "맑음"],
  ["1", "비"],
  ["2", "흐림"],
  ["3", "눈"],
  ["4", "소나기"],
  ["5", "폭우"],
  ["6", "진눈깨비"],
  ["7", "폭설"],
]
