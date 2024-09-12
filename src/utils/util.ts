import { WriteDiary, WriteDiaryWeather, toSendDataObj } from "../model/interfaces";

export const toSendData = (data: FormData) => {
  const toReturn: toSendDataObj = {};
  data.forEach((e, i) => {
    if(i !== 'pwCheck') toReturn[`${i}`] = e as string
  });
  return toReturn
}

export const whichObjIsEmpty = (checkObj: WriteDiary) => {

  if (checkObj === null) return checkObj;

  const obj = Object.entries(checkObj);

  let ret;

  for (let i = 0; i < obj.length; i++) {
    
    const a = obj[i][0] === 'weather' && obj[i][1] as WriteDiaryWeather;

    if (typeof a !== "boolean" && isEmptyObj(a.weatherLevel)) {
      ret = 'weatherLevel';
      break
    }
    if (isEmptyObj(obj[i][1])) {
      ret = obj[i][0];
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