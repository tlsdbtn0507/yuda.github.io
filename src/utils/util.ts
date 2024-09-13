import { WriteDiary, WriteDiaryFeeling, WriteDiaryWeather, toSendDataObj } from "../model/interfaces";

export const toSendData = (data: FormData) => {
  const toReturn: toSendDataObj = {};
  data.forEach((e, i) => {
    if (i !== 'pwCheck') toReturn[`${i}`] = e as string
  });
  return toReturn
};


type ObjEntryType = [string, string | {} | WriteDiaryFeeling | WriteDiaryWeather];

export const whichObjIsEmpty = (checkObj: WriteDiary) => {

  if (checkObj === null) return checkObj;

  const obj = Object.entries(checkObj);

  let ret;

  for (let i = 0; i < obj.length; i++) {

    const [key, values]: ObjEntryType = obj[i];
    const isValueWeather = values as WriteDiaryWeather;
    if (Array.isArray(isValueWeather.weatherLevel)) {
      ret = 'weatherLevel';
      break
    }
    if (isEmptyObj(values)) {
      ret = key;
      break
    }
  }
  return ret
}

export const isEmptyObj = (obj:{} | []) => {
  if (obj === null || obj === undefined || obj === '') {
    return true;
  }
  return (obj.constructor === Object || obj.constructor === Array)
    && Object.keys(obj).length === 0 
}