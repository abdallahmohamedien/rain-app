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

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Location permission is required to show rain data.");
        setLoading(false);
        return;
      }

      let location = await Location.getLastKnownPositionAsync({});

      if (!location) {
        location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
      }

      const data = await getWeather(
        location.coords.latitude,
        location.coords.longitude,
      );

      if (data) {
        setWeather(data);
      } else {
        setError("Rain data unavailable for your current location.");
      }
    } catch (err: any) {
      setError("Unable to get your current location. Please check your GPS.");
      console.error("Fetch Error:", err.message);
    } finally {
      setLoading(false);
    }
  }, [setWeather]);

  return { weather, loading, error, fetchWeather };
};
