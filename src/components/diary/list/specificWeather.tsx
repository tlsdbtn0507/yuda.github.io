import React from "react";
import css from "../../../css/preview.module.css";

interface SpecificWeatherProps {
  specificWeather: {
    temp: string
    humidity: string
    cond: string
    rainAmount: string   
  }
}

const SpecificWeather:React.FC<SpecificWeatherProps> = ({specificWeather}) => {
  const { temp, humidity, cond, rainAmount } = specificWeather;
  return (
    <div className={css.specificWeatherWrapper}>
      <p className={css.specificWeatherParagraph}>
        <span>온도 : { temp }</span>
        <span>강우 형태 : { cond }</span>
      </p>
      <p className={css.specificWeatherParagraph}>
        <span>습도 : { humidity }</span>
        <span>강우량 : { rainAmount }</span>
      </p>
    </div>
  )
}

export default SpecificWeather;
