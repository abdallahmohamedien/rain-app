import * as Location from "expo-location";
import { useCallback, useState } from "react";
import { getWeather } from "../api/weather.api";
import { useWeatherStore } from "../store/weatherStore";

export const useWeather = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { weather, setWeather } = useWeatherStore();

  const fetchWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. طلب إذن الوصول للموقع
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        setLoading(false);
        return;
      }

      // 2. جلب الموقع الحالي بدقة عالية
      let location = await Location.getCurrentPositionAsync({});

      // 3. جلب بيانات الطقس بناءً على الإحداثيات
      const data = await getWeather(
        location.coords.latitude,
        location.coords.longitude,
      );
      setWeather(data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [setWeather]);

  return { weather, loading, error, fetchWeather };
};
