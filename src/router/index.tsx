import { createBrowserRouter } from 'react-router-dom';
import Root from "./root";
import Login from './login';
import Sign from './sign';
import HomePage from './homePage';
import { sendSign } from '../api/users/usersApi';
import Write from './write';

const router = createBrowserRouter([
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
      },
      {
        path: "/write",
        element: <Write />
      }
    ]
  }
], {
  basename: process.env.NODE_ENV === 'development' ? '' : process.env.PUBLIC_URL
}
);
export default router