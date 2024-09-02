import { renewToken } from "../api/users/usersApi";
import { toSendDataObj } from "../model/types";

export const toSendData = (data: FormData) => {
  const toReturn: toSendDataObj = {};
  data.forEach((e, i) => {
    if(i !== 'pwCheck') toReturn[`${i}`] = e as string
  });
  return toReturn
}

export const isEmptyObj = (obj: Object) => {
  if (obj === null || obj === undefined) {
    return true;
  }
  return obj.constructor === Object && Object.keys(obj).length === 0 
}