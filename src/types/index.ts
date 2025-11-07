export interface InputDropDownProps {
  value: Record<WeatherVariableKeySelected, string>;
  selected: WeatherVariableKeySelected[];
  onChange: (selected: WeatherVariableKeySelected[]) => void;
  id?: string;
}

export interface TableWeatherProps {
  lat: number;
  long: number;
  variables: WeatherVariableKeySelected[];
}

export type WeatherVariableKey =
  | "time"
  | "weathercode"
  | "temperature_2m_max"
  | "temperature_2m_min"
  | "apparent_temperature_max"
  | "apparent_temperature_min"
  | "sunrise"
  | "sunset"
  | "precipitation_sum"
  | "rain_sum"
  | "showers_sum"
  | "snowfall_sum"
  | "precipitation_hours"
  | "windspeed_10m_max"
  | "windgusts_10m_max"
  | "winddirection_10m_dominant"
  | "shortwave_radiation_sum"
  | "et0_fao_evapotranspiration";

export type WeatherVariableKeySelected = Exclude<WeatherVariableKey, "time">;

export type WeatherParamsValues = Record<
  WeatherVariableKey,
  string[] | number[] | undefined
>;

export interface WeatherParamsUnits {
  time: string;
  weathercode?: string;
  temperature_2m_max?: string;
  temperature_2m_min?: string;
  apparent_temperature_max?: string;
  apparent_temperature_min?: string;
  sunrise?: string;
  sunset?: string;
  precipitation_sum?: string;
  rain_sum?: string;
  showers_sum?: string;
  snowfall_sum?: string;
  precipitation_hours?: string;
  windspeed_10m_max?: string;
  windgusts_10m_max?: string;
  winddirection_10m_dominant?: string;
  shortwave_radiation_sum?: string;
  et0_fao_evapotranspiration?: string;

  [key: string]: string | undefined;
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily: WeatherParamsValues;
  daily_units: WeatherParamsUnits;
}
