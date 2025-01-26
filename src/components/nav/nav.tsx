import { faCirclePlus, faClipboard, faUser } from "@fortawesome/free-solid-svg-icons"
import { useMutation } from "@tanstack/react-query"
import { logoutPost } from "../../api/users/usersApi"
import { useNavigate } from "react-router"
import { LogoutReturnType, NavProps } from "model/interfaces"
import { handleAlertPerDevice, handleConfirmPerDevice } from "utils/util"

import css from '../../css/lowNav.module.css'
import NavBtn from "./navBtn"
import APIS from "constants/apiConstants"
import ERROR from "constants/ErrorConstants"
import UI from "constants/uiConstants"

const { CONFIRM_LOGOUT, TODAY_DIARY, WRITE_DIARY, LOGOUT } = UI.NavTsx;

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

  return (
    <div className={css.lowNav}>
      <NavBtn icon={faClipboard} onClick={todayRoute} p={TODAY_DIARY} />
      <NavBtn icon={faCirclePlus} onClick={() => onDiaryClick()} p={WRITE_DIARY} />
      <NavBtn icon={faUser} onClick={logoutConfirm} p={LOGOUT} />
    </div>
  )
};

export default Nav