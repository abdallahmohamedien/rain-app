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
import { GlassCard } from '@/components/GlassCard'; // سيعرض توقعات المطر لـ 3 أيام
import { HourlyList } from '@/components/HourlyList'; // سيعرض احتمالية المطر بالساعات
import { RainAlert } from '@/components/RainAlert';
import { RainEffect } from '@/components/RainEffect';
import { SnowEffect } from '@/components/SnowEffect';
import { WeatherInfoGrid } from '@/components/WeatherInfoGrid';
import { useWeather } from '@/hooks/useWeather';

const { height } = Dimensions.get('window');

export default function HomeScreen() {
  const { weather, loading, fetchWeather } = useWeather();

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  // خلفية داكنة صلبة للابتعاد عن ستايل iOS الشفاف
  const backgroundColors = useMemo((): [string, string, ...string[]] => {
    return ['#0f172a', '#1e293b'];
  }, []);

  const conditionText = weather?.current?.condition?.text?.toLowerCase() || '';
  const isRaining = conditionText.includes('rain') || conditionText.includes('drizzle');
  const isSnowing = conditionText.includes('snow') || conditionText.includes('blizzard');

  // شاشة التحميل
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

        {/* تأثيرات الجو */}
        {isRaining && <RainEffect />}
        {isSnowing && <SnowEffect />}

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={fetchWeather}
              tintColor="#60a5fa"
            />
          }
        >
          {/* Header Section: تصميم عصري محاذاة لليسار */}
          <View style={styles.header}>
            <View style={styles.locationRow}>
              <Navigation color="#60a5fa" size={14} />
              <Text style={styles.cityText}>{weather?.location?.name.toUpperCase() || 'UNKNOWN'}</Text>
            </View>
            {weather && <RainAlert condition={weather.current.condition.text} />}
            <View style={styles.mainTempRow}>
              <Text style={styles.tempText}>
                {Math.round(weather?.current?.temp_c || 0)}°
              </Text>
              <View style={styles.conditionBox}>
                <CloudRain color="#60a5fa" size={24} />
                <Text style={styles.conditionText}>{weather?.current?.condition?.text}</Text>
              </View>
            </View>
          </View>

          {weather && (
            <View style={styles.content}>

              {/* 1. قسم احتمالية المطر بالساعات */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Rain Probability</Text>
                <HourlyList hours={weather.forecast.forecastday[0].hour} />
              </View>

              {/* 2. شبكة تفاصيل الطقس (الرطوبة، الرياح، الخ) */}
              <WeatherInfoGrid weather={weather} />

              {/* 3. توقعات الأمطار للأيام القادمة */}
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
    paddingTop: height * 0.08,
    paddingBottom: 40
  },
  header: {
    paddingHorizontal: 25,
    marginBottom: 20,
    alignItems: 'flex-start', // محاذاة لليسار
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 5,
  },
  cityText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 2
  },
  mainTempRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 15,
  },
  tempText: {
    color: '#fff',
    fontSize: 90,
    fontWeight: '900',
    lineHeight: 100,
  },
  conditionBox: {
    paddingBottom: 20,
    gap: 4
  },
  conditionText: {
    color: '#60a5fa',
    fontSize: 16,
    fontWeight: '600'
  },
  content: {
    width: '100%',
  },
  sectionContainer: {
    marginBottom: 25,
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
    marginTop: 10
  }
});