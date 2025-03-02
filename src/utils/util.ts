import APIS from "constants/apiConstants";
import {
  WriteDiaryFeeling,
  WriteDiaryWeather,
  toSendDataObj,
  WriteDiaryEnum,
  Days,
  IsDiaryWritten,
} from "../model/interfaces";

import UI from "constants/uiConstants";

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

export const whichObjIsEmpty = (checkObj: IsDiaryWritten) => {
  if (checkObj === null) return checkObj;

  const obj = Object.entries(checkObj);

  let ret;

  for (let i = 0; i < obj.length; i++) {
    const [key, values]: ObjEntryType = obj[i];
    const isValueWeather = values as WriteDiaryWeather;

    if (Array.isArray(isValueWeather.weatherLevel)) {
      ret = WriteDiaryEnum.WeatherLevel;
      break;
    }
    if (isEmptyObj(values)) {
      ret = key;
      break;
    }
    ret = DONE;
  }
  return ret;
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

const datesForStringMaker = () => {
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
