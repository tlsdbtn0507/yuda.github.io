import UI from "constants/uiConstants"
import css from "../../css/login.module.css";
import LoadingSpin from "components/util/loadingSpin";

const LoginBtnSpin = (props: { showLoadingSpin: boolean }) => {

  const isShowLoadingSpin = Number(props.showLoadingSpin);

  return (
    <div className={css.btnSpinDiv}>
      <div style={{ opacity: isShowLoadingSpin }}><LoadingSpin /></div>
      <button type="submit" className={css.btn}>
        {UI.LOGIN.UI_LOGIN}
      </button>
    </div>
  )
}

export default LoginBtnSpin