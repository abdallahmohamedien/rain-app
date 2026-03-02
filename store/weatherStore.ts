import { create } from "zustand";

interface WeatherStore {
  weather: any;
  setWeather: (data: any) => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  weather: null,
  setWeather: (data) => set({ weather: data }),
}));
