import {
  WriteDiary,
  WriteDiaryFeeling,
  WriteDiaryWeather,
  toSendDataObj,
  WriteDiaryEnum,
} from "../model/interfaces";

export const toSendData = (data: FormData) => {
  const toReturn: toSendDataObj = {};
  data.forEach((e, i) => {
    if (i !== "pwCheck") toReturn[`${i}`] = e as string;
  });
  return toReturn;
};

type ObjEntryType = [
  string,
  string | {} | WriteDiaryFeeling | WriteDiaryWeather
];

export const whichObjIsEmpty = (checkObj: WriteDiary) => {
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
    ret = "done";
  }
  return ret;
};

export const isEmptyObj = (obj: {} | []) => {
  if (obj === null || obj === undefined || obj === "") {
    return true;
  }
  return (
    (obj.constructor === Object || obj.constructor === Array) &&
    Object.keys(obj).length === 0
  );
};

export const mentMaker = (feeling: WriteDiaryFeeling): string => {
  let ment: string = "";
  switch (feeling.level) {
    case 1:
      ment = feeling.ment.slice(0, 2) + "였";
      break;
    case 2:
      ment = feeling.ment.slice(0, -1);
      break;
    case 3:
      ment = feeling.ment.replace("!", "했");
      break;

    default:
      break;
  }
  return ment;
};

export const selectedSumTitle = (level: string, ment: string) => {

  let toReturn = "";
  switch (ment) {
    case "비가 왔어":
    case "눈이 왔어":
      const [subject, verb] = ment.split(" ");
      toReturn = `${subject} ${level} ${verb}`;
      break;

    default:
      toReturn = `${level} ${ment}`;
      break;
  }

  return toReturn;
};

export const lessThan7letters = (sen: string) => {
  return sen.length > 7 ? sen.slice(0, 6) + '...' : sen;
}

