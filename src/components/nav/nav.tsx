import { faCirclePlus, faClipboard, faUser } from "@fortawesome/free-solid-svg-icons"
import { useMutation } from "@tanstack/react-query"
import { logoutPost } from "../../api/users/usersApi"
import { useNavigate } from "react-router"
import { DiaryToSendToSurver, LogoutReturnType, NavProps } from "model/interfaces"
import { dayMakerToSend, handleAlertPerDevice, handleConfirmPerDevice, whichObjIsEmpty } from "utils/util"

import css from '../../css/lowNav.module.css'
import NavBtn from "./navBtn"
import APIS from "constants/apiConstants"
import ERROR from "constants/ErrorConstants"
import UI from "constants/uiConstants"
import { useEffect } from "react"
import { writeTodayDiary } from "api/diary/diaryApi"

const { CONFIRM_LOGOUT, TODAY_DIARY, WRITE_DIARY, LOGOUT } = UI.NavTsx;

export const checkIsDiaryToUpdate = (writingDiary: DiaryToSendToSurver) => {
  const today = dayMakerToSend();
  const diaryWrittenSoFar = whichObjIsEmpty(writingDiary);

  if (writingDiary.diaryDate !== today) {
    if (diaryWrittenSoFar === UI.DONE) {
      writeTodayDiary(writingDiary)
    }
    localStorage.removeItem("writingDiary");
  }
}

const Nav: React.FC<NavProps> = ({ onDiaryClick }) => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: logoutPost,
    mutationKey: [APIS.QUERIES.LOGOUT],
    onSuccess: (data: LogoutReturnType) => logoutHandler(data.result)
  });

  const logoutHandler = (result: boolean) => {
    if (result) {
      localStorage.clear();
      return navigate(APIS.ROUTES.ROOT)
    }
    handleAlertPerDevice(ERROR.LOGOUT_FAIL);
  }

  const logoutConfirm = () => handleConfirmPerDevice(CONFIRM_LOGOUT) && mutate();


  const todayRoute = () => { };



  useEffect(() => {
    const writingDiary = JSON.parse(localStorage.getItem("writingDiary") as string) as DiaryToSendToSurver;
    if (!writingDiary) return;

    checkIsDiaryToUpdate(writingDiary);
  },[])

  return (
    <div className={css.lowNav}>
      <NavBtn icon={faClipboard} onClick={todayRoute} p={TODAY_DIARY} />
      <NavBtn icon={faCirclePlus} onClick={() => onDiaryClick()} p={WRITE_DIARY} />
      <NavBtn icon={faUser} onClick={logoutConfirm} p={LOGOUT} />
    </div>
  )
};

export default Nav;