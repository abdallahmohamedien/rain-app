import { GlassCard } from '@/components/GlassCard';
import { HourlyList } from '@/components/HourlyList';
import { useWeather } from '@/hooks/useWeather';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const { weather, loading, fetchWeather } = useWeather();

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  if (loading && !weather) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#60a5fa" />
      </View>
    );
  }

  return (
    <LinearGradient colors={['#1e293b', '#0f172a']} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchWeather} tintColor="#fff" />}
      >
        <View style={styles.header}>
          <Text style={styles.cityText}>{weather?.location?.name || 'Loading...'}</Text>
          <Text style={styles.tempText}>{Math.round(weather?.current?.temp_c || 0)}°</Text>
        </View>

        {weather && <GlassCard weather={weather} />}
        {weather && <HourlyList hours={weather.forecast.forecastday[0].hour} />}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a' },
  scroll: { alignItems: 'center', paddingTop: 80, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: 30 },
  cityText: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  tempText: { color: '#fff', fontSize: 90, fontWeight: '100' },
});