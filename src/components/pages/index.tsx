import { useState } from "react";
import { InputDropDown } from "../InputDropDown";
import TableWeather from "../TableWeather";
import styles from "./index.module.scss";
import { WeatherVariableKeySelected } from "../../types";

const paramsMeteo = {
  lat: 55.751244,
  long: 37.618423,
};

export const availableVariables: Record<WeatherVariableKeySelected, string> = {
  weathercode: "Код погоды",
  temperature_2m_max: "Макс. температура (2м)",
  temperature_2m_min: "Мин. температура (2м)",
  apparent_temperature_max: "Макс. ощущаемая температура °C",
  apparent_temperature_min: "Мин. ощущаемая температура °C",
  sunrise: "Восход солнца",
  sunset: "Закат солнца",
  precipitation_sum: "Осадки (всего)",
  rain_sum: "Дождь (мм)",
  showers_sum: "Ливни (мм)",
  snowfall_sum: "Снегопад (см)",
  precipitation_hours: "Часы с осадками",
  windspeed_10m_max: "Макс. скорость ветра (10м)",
  windgusts_10m_max: "Порывы ветра (10м)",
  winddirection_10m_dominant: "Направление ветра (10м)",
  shortwave_radiation_sum: "Солнечная радиация (Вт/м²)",
  et0_fao_evapotranspiration: "Испарение (ET₀)",
};

function Weather() {
  const [variables, setVariables] = useState<WeatherVariableKeySelected[]>([
    "rain_sum",
    "snowfall_sum",
  ]);

  return (
    <div className={styles["container"]}>
      <div className={styles["input"]}>
        <InputDropDown
          value={availableVariables}
          selected={variables}
          onChange={setVariables}
          id="filterInput"
        />
      </div>
      <div className={styles["table"]}>
        <TableWeather
          lat={paramsMeteo.lat}
          long={paramsMeteo.long}
          variables={variables}
        />
      </div>
    </div>
  );
}

export default Weather;
