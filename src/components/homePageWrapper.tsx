import { useQuery } from "@tanstack/react-query";
import { fetchDiaries } from "../api/diary/diaryApi";
import { diaryStore } from "../store/diary/diaryStore";
import { useEffect } from "react";
import { handleAlertPerDevice } from "utils/util";
import { useNavigate } from "react-router";

import css from "../css/main.module.css";
import LastToday from "../components/lastToday";
import MyDiaries from "../components/myDiaries";
import DayMaker from "../components/util/dayMaker";
import APIS from "constants/apiConstants";

const HomePageWrapper: React.FC = () => {
  const navigate = useNavigate();
  const {getDiaries} = diaryStore((state) => state);

  const { data, isError, error } = useQuery({
    queryKey: [APIS.QUERIES.DIARIES],
    queryFn: fetchDiaries,
    throwOnError: true,
  });

  useEffect(() => {
    if (isError) {
      handleAlertPerDevice(error.message);
      navigate(APIS.ROUTES.LOGIN);
      window.location.reload();
      return
    }
    if (data) return getDiaries(data);
  }, [isError, data, error, getDiaries, navigate]);

  return (
    <div className={css.wrapper}>
      <DayMaker />
      <LastToday />
      <MyDiaries />
    </div>
  );
};

export default HomePageWrapper;