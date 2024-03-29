export interface OpenWeatherMapGeoResponse {
  name: string;
  local_names: {
    [languageCode: string]: string;
    ascii: string;
    feature_name: string;
  };
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface OpenWeatherMapResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  rain?: {
    '1h'?: number;
    '3h'?: number;
  };
  snow?: {
    '1h'?: number;
    '3h'?: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

const BASE_URL = "http://api.openweathermap.org/"
const API_KEY = process.env.EXPO_PUBLIC_API_KEY
export const fetchCities = async (query: string) => {
  const url = `${BASE_URL}geo/1.0/direct?q=${query}&appid=${API_KEY}&limit=5`
  const resp: Response = await fetch(url)
  const data: [OpenWeatherMapGeoResponse] = await resp.json()
  return data
}

export const fetchForecast = async (lat: number, long: number) => {
  const url = `${BASE_URL}data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
  const resp: Response = await fetch(url)
  const data: OpenWeatherMapResponse = await resp.json()
  return data
}