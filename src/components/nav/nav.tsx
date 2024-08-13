import { faCirclePlus, faClipboard, faUser } from "@fortawesome/free-solid-svg-icons"
import { useMutation } from "@tanstack/react-query"
import { logoutPost } from "../../api/users/usersApi"
import { useNavigate } from "react-router"

import css from '../../css/lowNav.module.css'
import NavBtn from "./navBtn"
import { LogoutReturnType } from "model/types"

const Nav = () => {
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: logoutPost,
    mutationKey: ['logout'],
    onSuccess: (data: LogoutReturnType) => {
      logoutHandler(data.result);
    }
  });



  const logoutHandler = (result: boolean) => {
    if (window.confirm('정말 로그 아웃 하시겠습니까?')) {
      if (result) {
        localStorage.clear();
        navigate('/')
      }
      else alert('로그 아웃 오류')
    }
  }

  const todayRoute = () => {
    
  }

  const writeTodayRoute = () => { 
    navigate('/write');
  };
  
  return (
    <div className={css.lowNav}>
      <NavBtn icon={faClipboard} onClick={todayRoute} p="오늘의 일기"/>
      <NavBtn icon={faCirclePlus} onClick={writeTodayRoute} p="일기 쓰기"/>
      <NavBtn icon={faUser} onClick={mutate} p="로그아웃"/>
    </div>
  )
}

export default Nav