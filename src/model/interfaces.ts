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
  diaryDate: string;
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

export interface DiaryToSendToSurver extends Required<IsDiaryWritten> {
  lat: string;
  long: string;
  diaryDate: string;
  dayOfWeek: Days;
}

export interface RealWeatherData {
  humidity: string;
  rainAmount: string;
  rainCod: string;
  temp: string;
}

export interface DiaryCameFromServer extends DiaryToSendToSurver,RealWeatherData {
  id: number;
}

/* eslint-disable no-unused-vars */
export const enum WriteDiaryEnum {
  Feeling = "feeling",
  Weather = "weather",
  WeatherLevel = "weatherLevel",
  FeelingReason = "feelingReason",
}

export enum Days {
  SUN = "Sun",
  MON = "Mon",
  TUE = "Tue",
  WED = "Wed",
  THU = "Thu",
  FRI = "Fri",
  SAT = "Sat",
}
