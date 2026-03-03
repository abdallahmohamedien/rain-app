import { useWeatherStore } from '@/store/weatherStore';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default function MapScreen() {
    const { weather } = useWeatherStore();
    const mapRef = useRef<MapView>(null); // مرجع للتحكم في الخريطة

    // إحداثيات المدينة المختارة
    const location = {
        latitude: weather?.location?.lat || 30.0444, // القاهرة كاحتياطي
        longitude: weather?.location?.lon || 31.2357,
    };

    // تأثير جانبي: أول ما الـ weather يتغير، الخريطة "تطير" للمكان الجديد
    useEffect(() => {
        if (weather && mapRef.current) {
            mapRef.current.animateToRegion({
                ...location,
                latitudeDelta: 0.1, // زووم قريب للمدينة
                longitudeDelta: 0.1,
            }, 1000); // مدة الحركة ثانية واحدة
        }
    }, [weather]);

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    ...location,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                }}
            >
                {weather && (
                    <Marker
                        coordinate={location}
                        title={weather.location.name}
                        description={`${weather.current.temp_c}°C - ${weather.current.condition.text}`}
                    />
                )}
            </MapView>

            <View style={styles.overlay}>
                <Text style={styles.mapTitle}>
                    {weather?.location?.name || "Weather Radar"}
                </Text>
                <Text style={styles.mapSubtitle}>
                    {weather?.current?.condition?.text}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { width: '100%', height: '100%' },
    overlay: {
        position: 'absolute',
        top: 60,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        padding: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center'
    },
    mapTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    mapSubtitle: { color: '#60a5fa', fontSize: 14, marginTop: 4 }
});