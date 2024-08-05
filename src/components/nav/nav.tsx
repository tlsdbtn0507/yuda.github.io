import { faCirclePlus, faClipboard, faUser } from "@fortawesome/free-solid-svg-icons"
import { useMutation } from "@tanstack/react-query"
import { logoutPost } from "../../api/users/usersApi"
import { useNavigate } from "react-router"

import css from '../../css/lowNav.module.css'
import NavBtn from "./navBtn"

const Nav = () => {
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: logoutPost,
    mutationKey: ['logout']
  });



  const logoutHandler = () => {
    if (window.confirm('정말 로그 아웃 하시겠습니까?')) {
      const a = mutate();
      localStorage.clear();
      navigate('/')
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
      <NavBtn icon={faUser} onClick={logoutHandler} p="로그아웃"/>
    </div>
  )
}

export default Nav