import axios from "axios";

const API_KEY = "7754215307e84719877224203262602";
const BASE_URL = `https://api.weatherapi.com/v1`;

export const getWeather = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: `${lat},${lon}`,
        days: 3,
        aqi: "no",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching by coords:", error);
    throw error;
  }
};

export const getWeatherByCity = async (cityName: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: cityName,
        days: 3,
        aqi: "no",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching by city:", error);
    throw error;
  }
};
