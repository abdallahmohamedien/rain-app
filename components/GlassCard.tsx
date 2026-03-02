import { Droplets, Wind } from 'lucide-react-native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export const GlassCard = ({ weather }: { weather: any }) => {
    const current = weather.current;
    const day = weather.forecast.forecastday[0].day;

    return (
        <View style={styles.card}>
            <Image source={{ uri: `https:${current.condition.icon}` }} style={styles.icon} />
            <Text style={styles.condition}>{current.condition.text}</Text>

            <View style={styles.row}>
                <View style={styles.item}>
                    <Droplets color="#60a5fa" size={20} />
                    <Text style={styles.val}>{day.daily_chance_of_rain}%</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.item}>
                    <Wind color="#94a3b8" size={20} />
                    <Text style={styles.val}>{current.wind_kph}km/h</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 30, padding: 25, width: '90%', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
    icon: { width: 100, height: 100 },
    condition: { color: '#fff', fontSize: 22, fontWeight: '600', marginBottom: 20 },
    row: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
    item: { alignItems: 'center', gap: 5 },
    val: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    divider: { width: 1, height: '100%', backgroundColor: 'rgba(255,255,255,0.1)' }
});