import * as Location from "expo-location";
import { useCallback, useState } from "react";
import { getWeather } from "../api/weather.api";
import { useWeatherStore } from "../store/weatherStore";

export const useWeather = () => {
  const [loading, setLoading] = useState(false);
  const { weather, setWeather } = useWeatherStore();

  const fetchWeather = useCallback(async () => {
    try {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      let location = await Location.getCurrentPositionAsync({});
      const data = await getWeather(
        location.coords.latitude,
        location.coords.longitude,
      );
      setWeather(data);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, [setWeather]);

  return { weather, loading, fetchWeather };
};
