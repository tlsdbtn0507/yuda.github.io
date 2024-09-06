import { WriteDiary, toSendDataObj } from "../model/interfaces";

export const toSendData = (data: FormData) => {
  const toReturn: toSendDataObj = {};
  data.forEach((e, i) => {
    if(i !== 'pwCheck') toReturn[`${i}`] = e as string
  });
  return toReturn
}

export const whichObjIsEmpty = (checkObj: WriteDiary) => {
  const obj = Object.entries(checkObj);

  let ret;

  for (let i = 0; i < obj.length; i++) {
    if (isEmptyObj(obj[i][1])) {
      ret  = obj[i][0]
      break
    }
  }
  return ret
}

const isEmptyObj = (obj:{}) => {
  if (obj === null || obj === undefined || obj === '') {
    return true;
  }
  return obj.constructor === Object && Object.keys(obj).length === 0 
}