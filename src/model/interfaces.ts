export type Dates = {
  date: string;
  day: string;
  month: string;
};

export type Contents = {
  title: string;
  body: string;
};

export type Img = {
  url: string;
};

export type DiaryType = {
  id: number;
  userId: number;
  feeling: WriteDiaryFeeling;
  weather: SelectedDiaryWeahter;
  feelingReason: string;
  diaryDate: string;
  lat: number;
  long: number;
};

export interface DiarySummary {
  date: Dates;
  content: Contents;
  img: Img;
}

export interface sendObj {
  request: Request;
}

export interface toSendDataObj {
  [index: string]: string;
}

export interface BtnType {
  onClick: (e: React.FormEvent) => void;
  isIdVal: boolean | string;
  isSpinActivate: boolean;
}

export interface LogoutReturnType {
  message: string;
  result: boolean;
}

export interface NavProps {
  onDiaryClick: () => void;
}

export type IsDiaryWritten = {
  feeling: WriteDiaryFeeling | {};
  weather?: WriteDiaryWeather | {};
  feelingReason?: string;
};

export interface WriteDiaryFeeling {
  ment: string;
  level: number;
}

export type WriteDiaryWeather = {
  weatherCond: string;
  weatherLevel: WriteDiaryFeeling[];
};

export type SelectedDiaryWeahter = {
  weatherCond: string;
  weatherLevel: WriteDiaryFeeling;
};

export type WriteDiary = {
  feeling: WriteDiaryFeeling | {};
  weather?: WriteDiaryWeather | {};
  feelingReason?: string;
};

/* eslint-disable no-unused-vars */
export const enum WriteDiaryEnum {
  Feeling = "feeling",
  Weather = "weather",
  WeatherLevel = "weatherLevel",
  FeelingReason = "feelingReason",
}
