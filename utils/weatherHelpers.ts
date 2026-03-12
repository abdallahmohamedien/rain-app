export interface WardrobeAdvice {
  title: string;
  subtitle: string;
  items: string[];
  accessory: string;
}

export const getWardrobeAdvice = (
  temp: number,
  condition: string,
): WardrobeAdvice => {
  const isRaining =
    condition.toLowerCase().includes("rain") ||
    condition.toLowerCase().includes("drizzle");
  const isSnowing = condition.toLowerCase().includes("snow");

  if (isRaining) {
    return {
      title: "Rainy Day Gear",
      subtitle: `It's raining! Keep yourself dry while it's ${Math.round(temp)}°C outside.`,
      items:
        temp < 18
          ? ["Waterproof Coat", "Boots"]
          : ["Light Rain Jacket", "Sneakers"],
      accessory: "Umbrella Required ☔",
    };
  }

  if (isSnowing) {
    return {
      title: "Snow Alert",
      subtitle: "Heavy layers needed! It's snowing and freezing out there.",
      items: ["Thermal Wear", "Heavy Parka", "Winter Boots"],
      accessory: "Warm Gloves 🧤",
    };
  }

  if (temp <= 15) {
    return {
      title: "Winter Layers",
      subtitle: "It's quite cold. Make sure to bundle up properly.",
      items: ["Heavy Jacket", "Scarf", "Boots"],
      accessory: "Woolen Cap",
    };
  } else if (temp > 15 && temp <= 24) {
    return {
      title: "Mild Weather",
      subtitle: "Perfect weather for a hoodie or a light denim jacket.",
      items: ["Hoodie", "Chinos", "Comfortable Shoes"],
      accessory: "Smart Watch",
    };
  } else {
    return {
      title: "Sunny & Warm",
      subtitle: "Hot day ahead! Wear light fabrics to stay cool.",
      items: ["Cotton T-Shirt", "Linen Pants", "Sunglasses"],
      accessory: "Sunscreen 🧴",
    };
  }
};

export const getDrivingIndex = (weather: any) => {
  const visibility = weather?.current?.vis_km || 10;
  const windKm = weather?.current?.wind_kph || 0;
  const condition = weather?.current?.condition?.text?.toLowerCase() || "";

  let score = 10;

  if (visibility < 5) score -= 3;
  if (visibility < 1) score -= 5;
  if (windKm > 40) score -= 2;
  if (windKm > 70) score -= 4;
  if (condition.includes("rain") || condition.includes("snow")) score -= 2;
  if (condition.includes("heavy")) score -= 2;

  const finalScore = Math.max(1, score);

  if (finalScore >= 8)
    return {
      score: finalScore,
      label: "Safe",
      color: "#10b981",
      advice: "Perfect driving conditions.",
    };
  if (finalScore >= 5)
    return {
      score: finalScore,
      label: "Caution",
      color: "#f59e0b",
      advice: "Drive slowly. Wet or windy roads.",
    };
  return {
    score: finalScore,
    label: "Danger",
    color: "#ef4444",
    advice: "Low visibility. Avoid driving if possible.",
  };
};
