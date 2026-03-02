import axios from "axios";

const API_KEY = "7754215307e84719877224203262602";
const BASE_URL = `https://api.weatherapi.com/v1/forecast.json`;

export const getWeather = async (lat: number, lon: number) => {
  const response = await axios.get(`${BASE_URL}/forecast.json`, {
    params: {
      key: API_KEY,
      q: `${lat},${lon}`,
      days: 3,
      aqi: "no",
    },
  });
  return response.data;
};
