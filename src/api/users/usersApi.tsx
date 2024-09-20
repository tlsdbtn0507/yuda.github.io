import API from "../api";
import { redirect } from "react-router";
import { LogoutReturnType, sendObj } from '../../model/interfaces';
import { toSendData } from "../../utils/util";
import axios from "axios";

export const sendSign = async ({request}:sendObj) =>{

  const formData = await request.formData();

  try {
    const { data } = await API.post(`/user/signup`, toSendData(formData));
    alert('회원 가입이 완료되었습니다.')
    return redirect(`/login`)
  } catch (error) {
    //에러 처리 핸들러 추가하기!
    console.log(error)
    throw new Error()
  }
}

export const checkIdDuple = async (idToCheckDuple:string):Promise<boolean> => {
  const res = await API.post(`/user/idcheck`,{id:idToCheckDuple});
  return res.data
}

export const login = async (request: { id: string, pw: string }) => {
  try {
    const { data } = await API.post(`/user/login`, request);

    API.defaults.headers['Authorization'] = `Bearer ${data.accessToken}`;

    return data;
  } catch (error) {
    console.log(error)
  }
}

export const renewToken = async (): Promise<{ accessToken: string }> => {
  try {
    const { data } = await API.post('/user/renew');
    return data
  } catch (error) {
    throw new Error('토큰 갱신 실패');
  }
};

export const logoutPost = async (): Promise<LogoutReturnType> => {
  try {
    const { data } = await API.post('/user/logout');
    return data;
  } catch (error) {
    throw new Error('로그아웃 실패');
  }
};
