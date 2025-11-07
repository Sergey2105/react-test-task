import React, { useEffect, useState } from "react";
import { availableVariables } from "../pages";
import { TableWeatherProps, WeatherResponse } from "../../types";

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
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!weather?.daily) return <p>Нет данных</p>;

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        border: "1px solid #ccc",
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "150px",
            }}
          >
            Дата
          </th>
          {variables?.map((variable, index) => (
            <th
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "150px",
              }}
              key={variable}
            >
              {availableVariables[variable] ?? variable}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weather?.daily?.time?.map((time, index) => (
          <tr
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "150px",
            }}
            key={time}
          >
            <td
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "150px",
              }}
            >
              {formatValue(time, weather?.daily_units.time)}
            </td>

            {variables?.map((variableVal) => (
              <td
                key={`${time}-${variableVal}`}
                style={{
                  padding: "8px",
                  border: "1px solid #ccc",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "150px",
                }}
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
