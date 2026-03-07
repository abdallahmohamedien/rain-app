import { LinearGradient } from 'expo-linear-gradient';
import { CloudRain, Navigation } from 'lucide-react-native';
import React, { useEffect, useMemo } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

// Core Logic & Components
import { GlassCard } from '@/components/GlassCard';
import { HourlyList } from '@/components/HourlyList';
import { RainAlert } from '@/components/RainAlert';
import { RainEffect } from '@/components/RainEffect';
import { RainGraph } from '@/components/RainGraph';
import { SnowEffect } from '@/components/SnowEffect';
import { SunCycle } from '@/components/SunCycle';
import { WeatherInfoGrid } from '@/components/WeatherInfoGrid';
import { useWeather } from '@/hooks/useWeather';
const { height } = Dimensions.get('window');

export default function HomeScreen() {
  const { weather, loading, fetchWeather } = useWeather();

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const backgroundColors = useMemo((): [string, string, ...string[]] => {
    return ['#0f172a', '#1e293b'];
  }, []);

  const conditionText = weather?.current?.condition?.text?.toLowerCase() || '';
  const isRaining = conditionText.includes('rain') || conditionText.includes('drizzle');
  const isSnowing = conditionText.includes('snow') || conditionText.includes('blizzard');

  if (loading && !weather) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#60a5fa" />
        <Text style={styles.loadingText}>Fetching Rain Data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={backgroundColors} style={styles.container}>

        {isRaining && <RainEffect />}
        {isSnowing && <SnowEffect />}

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchWeather} tintColor="#60a5fa" />
          }
        >
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.locationRow}>
              <Navigation color="#60a5fa" size={14} />
              <Text style={styles.cityText}>{weather?.location?.name.toUpperCase() || 'UNKNOWN'}</Text>
            </View>

            <View style={styles.alertWrapper}>
              {weather && <RainAlert condition={weather.current.condition.text} />}
            </View>

            <View style={styles.mainTempRow}>
              <Text style={styles.tempText}>
                {Math.round(weather?.current?.temp_c || 0)}°
              </Text>
              <View style={styles.conditionBox}>
                <CloudRain color="#60a5fa" size={28} />
                <Text style={styles.conditionText}>{weather?.current?.condition?.text}</Text>
              </View>
            </View>
          </View>
          {weather && (
            <SunCycle
              sunData={{
                sunrise: weather.forecast.forecastday[0].astro.sunrise,
                sunset: weather.forecast.forecastday[0].astro.sunset
              }}
            />
          )}

          {weather && (
            <View style={styles.content}>

              {/* Rain Probability & Graph */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Rain Probability</Text>
                <View style={styles.hourlyWrapper}>
                  <HourlyList hours={weather.forecast.forecastday[0].hour} />
                </View>
                <View style={styles.graphWrapper}>
                  <RainGraph hours={weather.forecast.forecastday[0].hour} />
                </View>
              </View>


              <View style={styles.gridWrapper}>
                <WeatherInfoGrid weather={weather} />
              </View>

              {/* 3-Day Forecast */}
              <View style={styles.forecastWrapper}>
                <Text style={styles.sectionTitle}>Next Days Rain</Text>
                <GlassCard weather={weather} />
              </View>

            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#60a5fa',
    marginTop: 15,
    fontSize: 16,
    fontWeight: '500'
  },
  scroll: {
    paddingTop: height * 0.07,
    paddingBottom: 40
  },
  header: {
    paddingHorizontal: 25,
    marginBottom: 15,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  alertWrapper: {
    width: '100%',
    marginBottom: 15,
  },
  cityText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 2
  },
  mainTempRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  tempText: {
    color: '#fff',
    fontSize: 85,
    fontWeight: '900',
  },
  conditionBox: {
    justifyContent: 'center',
    gap: 4
  },
  conditionText: {
    color: '#60a5fa',
    fontSize: 18,
    fontWeight: '600'
  },
  content: {
    width: '100%',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  hourlyWrapper: {
    marginBottom: 10,
  },
  graphWrapper: {
    paddingHorizontal: 10,

  },
  gridWrapper: {
    width: '100%',
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 25,
    marginBottom: 15,
    letterSpacing: 0.5
  },
  forecastWrapper: {
    width: '100%',
    paddingHorizontal: 20,
  }
});