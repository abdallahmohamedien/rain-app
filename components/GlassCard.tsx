import { CloudRain } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const GlassCard = ({ weather }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rain Forecast (3 Days)</Text>

            {weather.forecast.forecastday.map((day: any, index: number) => (
                <View key={index} style={styles.dayRow}>
                    {/* اسم اليوم */}
                    <Text style={styles.dayName}>
                        {index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}
                    </Text>

                    {/* أيقونة المطر ونسبتها */}
                    <View style={styles.rainInfo}>
                        <CloudRain color="#60a5fa" size={20} />
                        <Text style={styles.rainChance}>{day.day.daily_chance_of_rain}%</Text>
                    </View>

                    {/* شريط مرئي لنسبة المطر (Progress Bar) */}
                    <View style={styles.progressContainer}>
                        <View style={[styles.progressBar, { width: `${day.day.daily_chance_of_rain}%` }]} />
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1e293b', // لون صلب وداكن للابتعاد عن شفافية الآيفون
        padding: 20,
        borderRadius: 25,
        marginTop: 20,
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(96, 165, 250, 0.2)',

    },
    title: {
        color: '#94a3b8',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 20,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    dayRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    dayName: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        width: 90,
    },
    rainInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        width: 60,
    },
    rainChance: {
        color: '#60a5fa',
        fontWeight: 'bold',
        fontSize: 16,
    },
    progressContainer: {
        flex: 1,
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 3,
        marginLeft: 15,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#60a5fa',
        borderRadius: 3,
    },
});