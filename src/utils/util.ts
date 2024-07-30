import { renewToken } from "../api/users/usersApi";
import { toSendDataObj } from "../model/types";

export const toSendData = (data: FormData) => {
  const toReturn: toSendDataObj = {};
  data.forEach((e, i) => {
    if(i !== 'pwCheck') toReturn[`${i}`] = e as string
  });
  return toReturn
}

export const tokenSet = (token: string) => {
  // localStorage.setItem('refreshToken', token);

  // const refreshToken = localStorage.getItem('refreshToken') as string;

  // const timer = process.env.REACT_APP_DELAY as string;

  // const refCondition = localStorage.getItem('nonRef');

  // if (refCondition === 'nonRef') {
  //   renewToken(refreshToken)
  //     .then(() => setTimeout(() => tokenSet(refreshToken), +timer));
  //   return 
  // } else setTimeout( async() => {
  //   const res = await renewToken(token);
  //   res && tokenSet(refreshToken);
  // }, +timer);
}