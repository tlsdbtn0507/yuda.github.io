import { createHashRouter } from 'react-router-dom';
import { sendSign } from '../api/users/usersApi';

import Root from "./root";
import Login from './login';
import Sign from './sign';
import HomePage from './homePage';
import UI from 'constants/uiConstants';
import APIS from 'constants/apiConstants';

const { HOME, LOGIN, SIGN, MAIN } = APIS.ROUTES;

const DEV = "development";

const router = createHashRouter([
  {
    path: HOME,
    element: <Root />,
    children: [
      {
        path: LOGIN,
        element: <Login />,
      },
      {
        path: SIGN,
        element: <Sign />,
        action: sendSign
      },
      {
        path: MAIN,
        element: <HomePage />
      },
    ]
  }
],
  {
    basename: process.env.NODE_ENV === DEV
      ? UI.EMPTY_STRING
      : process.env.PUBLIC_URL
  }
);
export default router