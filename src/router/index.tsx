import { createHashRouter } from 'react-router-dom';
import Root from "./root";
import Login from './login';
import Sign from './sign';
import HomePage from './homePage';
import { sendSign } from '../api/users/usersApi';

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/sign',
        element: <Sign />,
        action: sendSign
      },
      {
        path: "/main",
        element: <HomePage />
      }
    ]
  }
], {
  basename: process.env.NODE_ENV === 'development' ? '' : process.env.PUBLIC_URL
}
);
export default router