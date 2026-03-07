import { useWeatherStore } from '@/store/weatherStore';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, UrlTile } from 'react-native-maps';

export default function MapScreen() {
    const { weather } = useWeatherStore();
    const mapRef = useRef<MapView>(null);

    const [timestamp] = useState(Math.floor(Date.now() / 1000 / 600) * 600);

    const location = useMemo(() => ({
        latitude: weather?.location?.lat || 30.0444,
        longitude: weather?.location?.lon || 31.2357,
    }), [weather?.location?.lat, weather?.location?.lon]);

    useEffect(() => {
        if (weather && mapRef.current) {
            mapRef.current.animateToRegion({
                ...location,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
            }, 1000);
        }
    }, [weather, location]);

    const rainRadarUrl = `https://tilecache.rainviewer.com/v2/radar/${timestamp}/256/{z}/{x}/{y}/2/1_1.png`;

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                customMapStyle={darkMapStyle}
                initialRegion={{
                    ...location,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                }}
            >
                <UrlTile
                    urlTemplate={rainRadarUrl}
                    zIndex={1}
                    opacity={0.7}
                    tileSize={256}
                />

                {weather && (
                    <Marker coordinate={location}>
                        <View style={styles.customMarker}>
                            <View style={styles.markerDot} />
                            <View style={styles.markerPulse} />
                        </View>
                    </Marker>
                )}
            </MapView>

            <View style={styles.overlay}>
                <View style={styles.liveBadge}>
                    <View style={styles.redDot} />
                    <Text style={styles.liveText}>LIVE RADAR</Text>
                </View>
                <Text style={styles.mapTitle}>
                    {weather?.location?.name || "Global Radar"}
                </Text>
                <Text style={styles.mapSubtitle}>
                    {weather ? `${weather.current.temp_c}°C • ${weather.current.condition.text}` : "Loading..."}
                </Text>
            </View>
        </View>
    );
}

const darkMapStyle = [
    { "elementType": "geometry", "stylers": [{ "color": "#1e293b" }] },
    { "elementType": "labels.text.fill", "stylers": [{ "color": "#94a3b8" }] },
    { "elementType": "labels.text.stroke", "stylers": [{ "color": "#1e293b" }] },
    { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#0f172a" }] },
    { "featureType": "road", "stylers": [{ "visibility": "off" }] }
];

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a' },
    map: { width: '100%', height: '100%' },
    overlay: {
        position: 'absolute',
        top: 60,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        padding: 18,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
    },
    liveBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
        marginBottom: 8,
        gap: 5
    },
    redDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#ef4444' },
    liveText: { color: '#ef4444', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
    mapTitle: { color: '#fff', fontSize: 20, fontWeight: '900' },
    mapSubtitle: { color: '#60a5fa', fontSize: 14, fontWeight: '600', marginTop: 2 },
    customMarker: { alignItems: 'center', justifyContent: 'center' },
    markerDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#60a5fa', zIndex: 2 },
    markerPulse: {
        position: 'absolute',
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(96, 165, 250, 0.4)',
        zIndex: 1
    }
});