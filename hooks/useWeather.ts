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

      // 1. طلب الإذن للوصول للموقع (Permissions)
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Location permission is required to show rain data.");
        setLoading(false);
        return;
      }

      // 2. جلب الموقع الحالي (تأكدي من استخدام getLastKnownPosition أولاً لسرعة الأداء)
      let location = await Location.getLastKnownPositionAsync({});

      // إذا لم يتوفر موقع مسجل مسبقاً، نطلب الموقع الحالي بدقة عالية
      if (!location) {
        location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced, // Balanced أسرع وأقل استهلاكاً للبطارية من High
        });
      }

      // 3. إرسال الإحداثيات الـ API
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
