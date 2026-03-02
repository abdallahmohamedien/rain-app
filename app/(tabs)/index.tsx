import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useMemo } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

// Core Logic & Components
import { GlassCard } from '@/components/GlassCard';
import { HourlyList } from '@/components/HourlyList';
import { RainEffect } from '@/components/RainEffect';
import { SnowEffect } from '@/components/SnowEffect';
import { useWeather } from '@/hooks/useWeather';

const { height } = Dimensions.get('window');

export default function HomeScreen() {
  const { weather, loading, fetchWeather } = useWeather();

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  // Handle Dynamic Background Colors with strict TypeScript Typing
  const backgroundColors = useMemo((): [string, string, ...string[]] => {
    const condition = weather?.current?.condition?.text?.toLowerCase() || '';

    if (condition.includes('rain') || condition.includes('drizzle')) {
      return ['#1e293b', '#0f172a'];
    }
    if (condition.includes('cloud') || condition.includes('overcast')) {
      return ['#475569', '#1e293b'];
    }

    return ['#0ea5e9', '#2563eb'];
  }, [weather]);

  const conditionText = weather?.current?.condition?.text?.toLowerCase() || '';
  const isRaining = conditionText.includes('rain') || conditionText.includes('drizzle');
  const isSnowing = conditionText.includes('snow') || conditionText.includes('blizzard');

  if (loading && !weather) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#60a5fa" />
        <Text style={styles.loadingText}>Loading Weather...</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={backgroundColors} style={styles.container}>
      {/* Animation layer */}
      {/* <RainEffect /> */}
      {isRaining && <RainEffect />}
      {isSnowing && <SnowEffect />}
      {/* <SnowEffect /> */}

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchWeather}
            tintColor="#fff"
          />
        }
      >
        <View style={styles.header}>
          <Text style={styles.cityText}>{weather?.location?.name || 'Unknown'}</Text>
          <Text style={styles.tempText}>
            {Math.round(weather?.current?.temp_c || 0)}°
          </Text>
          <Text style={styles.conditionText}>
            {weather?.current?.condition?.text}
          </Text>
        </View>

        {weather && (
          <View style={styles.content}>
            <GlassCard weather={weather} />

            <View style={styles.forecastSection}>
              <Text style={styles.sectionTitle}>Hourly Forecast</Text>
              <HourlyList hours={weather.forecast.forecastday[0].hour} />
            </View>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a'
  },
  loadingText: {
    color: '#60a5fa',
    marginTop: 15,
    fontSize: 16,
    fontWeight: '500'
  },
  scroll: {
    alignItems: 'center',
    paddingTop: height * 0.12,
    paddingBottom: 40
  },
  header: {
    alignItems: 'center',
    marginBottom: 40
  },
  cityText: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
    letterSpacing: 0.5
  },
  tempText: {
    color: '#fff',
    fontSize: 100,
    fontWeight: '100',
    marginVertical: -10
  },
  conditionText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 20,
    fontWeight: '500',
    textTransform: 'capitalize'
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  forecastSection: {
    width: '100%',
    marginTop: 30
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 25,
    marginBottom: 15
  },
});