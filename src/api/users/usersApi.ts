import { redirect } from "react-router";
import { LogoutReturnType, sendObj } from '../../model/interfaces';
import { toSendData } from "../../utils/util";

import API from "../api";
import ERROR from "constants/ErrorConstants";
import APIS from "constants/apiConstants";

const { LOGIN } = APIS.ROUTES;

export const sendSign = async ({ request }: sendObj) => {

  const formData = await request.formData();

  try {
    await API.post(`/user/signup`, toSendData(formData));
    alert('회원 가입이 완료되었습니다.')
    return redirect(LOGIN)
  } catch (error) {
    throw new Error()
  }
}

export const checkIdDuple = async (idToCheckDuple: string): Promise<boolean> => {
  const res = await API.post(`/user/idcheck`, { id: idToCheckDuple });
  return res.data
}

export const login = async (request: { id: string, pw: string }) => {
  try {
    const { data } = await API.post(`/user/login`, request);

    API.defaults.headers['Authorization'] = `Bearer ${data.accessToken}`;

    return data;
  } catch (error) {
    throw new Error(ERROR.LOGIN_FAIL);
  }
}

export const renewToken = async (): Promise<{ accessToken: string }> => {
  try {
    const { data } = await API.post('/user/renew');
    return data
  } catch (error) {
    throw new Error(ERROR.RENEW_TOKEN);
  }
};

export const logoutPost = async (): Promise<LogoutReturnType> => {
  try {
    const { data } = await API.post('/user/logout');
    return data;
  } catch (error) {
    throw new Error(ERROR.LOGOUT_FAIL);
  }
};
