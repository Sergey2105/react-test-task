import React, { useEffect, useState } from "react";
import { availableVariables } from "../pages";
import { TableWeatherProps, WeatherResponse } from "../../types";
import styles from "./index.module.scss";

const TableWeather: React.FC<TableWeatherProps> = (
  props: TableWeatherProps
) => {
  const { lat, long, variables } = props;
  const [weather, setWeather] = useState<WeatherResponse | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=${variables.join(
        ","
      )}&timezone=Europe/Moscow&past_days=0`
    )
      .then((resp) => resp.json())
      .then((data) => setWeather(data))
      .catch((err) => setError(err.message || "Ошибка загрузки"))
      .finally(() => setLoading(false));
  }, [lat, long, variables]);

  const formatValue = (
    value: string | number | undefined,
    unit: string | undefined
  ) => {
    if (value === null || value === undefined) return "-";
    if (unit === "iso8601") {
      const dateStr = String(value);
      if (dateStr.includes("T")) {
        const [date, time] = dateStr.split("T");
        return `${new Date(dateStr).toLocaleDateString("ru-RU")} ${time}`;
      }
      return new Date(dateStr).toLocaleDateString("ru-RU");
    }
    return String(value);
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p className={styles["error"]}>{error}</p>;
  if (!weather?.daily) return <p>Нет данных</p>;

  return (
    <table className={styles["table"]}>
      <thead>
        <tr>
          <th className={styles["table-cell"]}>Дата</th>
          {variables?.map((variable, index) => (
            <th className={styles["table-cell"]} key={variable}>
              {availableVariables[variable] ?? variable}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weather?.daily?.time?.map((time, index) => (
          <tr key={time}>
            <td className={styles["table-cell"]}>
              {formatValue(time, weather?.daily_units.time)}
            </td>

            {variables?.map((variableVal) => (
              <td
                key={`${time}-${variableVal}`}
                className={styles["table-cell"]}
              >
                {formatValue(
                  weather?.daily[variableVal]?.[index],
                  weather?.daily_units[variableVal]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableWeather;
