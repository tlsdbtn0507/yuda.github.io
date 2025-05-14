import APIS from "../constants/apiConstants";
import {
  WriteDiaryFeeling,
  WriteDiaryWeather,
  toSendDataObj,
  WriteDiaryEnum,
  Days,
  IsDiaryWritten,
  DiaryCameFromServer,
  SelectedDiaryWeahter,
} from "../model/interfaces";

import UI from "../constants/uiConstants";
import { RAIN_COND_ARR } from "../model/constants";

const { STRING_PWCHECK, DATE_LITERAL_METHODS } = APIS;
const {
  SPACE_STRING,
  EMPTY_STRING,
  DONE,
  WriteDoneBtnTsx: { MARKS },
  DAYS_OF_WEEK,
  STRING_ZERO,
} = UI;

export const toSendData = (data: FormData) => {
  const toReturn: toSendDataObj = {};
  data.forEach((e, i) => {
    if (i !== STRING_PWCHECK) toReturn[`${i}`] = e as string;
  });
  return toReturn;
};

type ObjEntryType = [
  string,
  string | {} | WriteDiaryFeeling | WriteDiaryWeather
];

type ObjEnums = WriteDiaryEnum | string | boolean;

export const whichObjIsEmpty = (checkObj: IsDiaryWritten | null): ObjEnums=> {
  if (checkObj === null) return false;

  const obj = Object.entries(checkObj);

  for (let i = 0; i < obj.length; i++) {
    const [key, values]: ObjEntryType = obj[i];
    const isValueWeather = values as WriteDiaryWeather;

    if (Array.isArray(isValueWeather.weatherLevel)) {
      return WriteDiaryEnum.WeatherLevel;
    }
    if (isEmptyObj(values)) {
      return key;
    }
  }
  return DONE;
};

export const isEmptyObj = (obj: {} | []) => {
  //null값을 받을 수 있기 때문
  if (obj === null || obj === undefined || obj === EMPTY_STRING) {
    return true;
  }
  return (
    (obj.constructor === Object || obj.constructor === Array) &&
    Object.keys(obj).length === 0
  );
};

export const mentMaker = (feeling: WriteDiaryFeeling): string => {
  const REPLACE_STR = "했";
  const SLICE_STR = "였";
  const { EXCLAMATION } = MARKS;

  let ment: string = EMPTY_STRING;
  switch (feeling.level) {
    case 1:
      ment = feeling.ment.slice(0, 2) + SLICE_STR;
      break;
    case 2:
      ment = feeling.ment.slice(0, -1);
      break;
    case 3:
      ment = feeling.ment.replace(EXCLAMATION, REPLACE_STR);
      break;

    default:
      break;
  }
  return ment;
};

export const selectedSumTitle = (level: string, ment: string) => {
  let toReturn = EMPTY_STRING;
  switch (ment) {
    case "비가 왔어":
    case "눈이 왔어":
      const [subject, verb] = ment.split(SPACE_STRING);
      toReturn = `${subject} ${level} ${verb}`;
      break;

    default:
      if (level === EMPTY_STRING) {
        toReturn = `${ment}`;
        break;
      }
      toReturn = `${level} ${ment}`;
      break;
  }

  return toReturn;
};

export const lessThan7letters = (sen: string) => {
  const THREE_DOTS = "...";
  return sen.length > 7 ? sen.slice(0, 6) + THREE_DOTS : sen;
};

export const handleAlertPerDevice = (alertMsg: string) => {
  // WKWebView 메시지 전달
  if (window.webkit?.messageHandlers?.nativeAlert) {
    window.webkit.messageHandlers.nativeAlert.postMessage(alertMsg);
  } else {
    // 브라우저 환경
    alert(alertMsg);
  }
};

export const handleConfirmPerDevice = (message: string,) => {
  const result = window.confirm(message);
  return result;
};

export const whichDayIsitToday = (): Days => {
  return DAYS_OF_WEEK[new Date().getDay()];
};

export const datesForStringMaker = () => {
  const now = new Date();
  const methods = DATE_LITERAL_METHODS;

  return methods
    .map((method) => now[method]())
    .map((content, index) => (index === 1 ? content + 1 : content))
    .map((date) => String(date).padStart(2, STRING_ZERO));
};

export const dayMakerToPage = (): string => {
  const [year, month, date] = datesForStringMaker();

  return `${year} . ${month} . ${date} . ${whichDayIsitToday()}`;
};

export const dayMakerToSend = () => {
  const [year, month, date] = datesForStringMaker();

  return `${year}-${month}-${date}`;
};

export const isValidDay = (day: string): string | boolean => {
  return Object.values(Days).includes(day as Days) ? day : false;
}

export const previewContentArrayMaker = (diaryPreviewDetails: DiaryCameFromServer) => {
  const { feeling, weather, humidity, rainAmount, rainCod, temp } = diaryPreviewDetails;

  const feelingPreview = feelingPreviewMaker(feeling as WriteDiaryFeeling);
  const weatherPreview = weatherPreviewMaker(weather as SelectedDiaryWeahter);
  const rainCondPreview = rainCondChecker(rainCod);

  return {
    feelingInDiary: feelingPreview,
    weatherInDiary: weatherPreview,
    specificWeatherInDiary: {
      cond: rainCondPreview,
      temp: `${temp}도`,
      humidity : `${humidity}%`,
      rainAmount: `${rainAmount}mm`,
    }
  }
};

export const feelingPreviewMaker = (feeling: { ment: string, level: number }) => {
  const STRING_SLICED_LAST = feeling.ment.slice(0, feeling.ment.length - 1);

  switch (feeling.level) {
    case 1:
      return `${feeling.ment.slice(0, 2)} 였던 하루`;
    case 3:
      return `${STRING_SLICED_LAST}했던 하루`;
    default:
      return `${STRING_SLICED_LAST}던 하루`;
  }
};

export const weatherPreviewMaker = (weather: SelectedDiaryWeahter) => {
  const { weatherCond, weatherLevel } = weather;
  const wMent =
    weatherLevel.level === 2 ? EMPTY_STRING : weatherLevel.ment.slice(0, -1);
  const weatherSummary = `${selectedSumTitle(wMent, weatherCond).slice(0, -1)}`
  
  return `${weatherSummary}던 하루`;
};

export const rainCondChecker = (rainCond: string) => {
  return RAIN_COND_ARR.find((rain) => rain[0] === rainCond)![1]
};