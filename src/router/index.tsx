import { createBrowserRouter } from 'react-router-dom';
import Root from "./root";
import Login from './login';
import Sign from './sign';
import HomePage from './homePage';
import { sendSign } from '../api/users/usersApi';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Root/>,
    children:[
      {
        path:'/login',
        element: <Login />,
      },
      {
        path:'/sign', 
        element: <Sign />,
        action:sendSign
      },
      {
        path:"/main",
        element:<HomePage/>
      }
    ]
  }
])
export default router