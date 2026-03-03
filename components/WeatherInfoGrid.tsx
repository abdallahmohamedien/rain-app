import { Droplets, Eye, Sun, Wind } from 'lucide-react-native';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

export const WeatherInfoGrid = ({ weather }: any) => {
    const current = weather.current;
    if (!weather || !weather.current) return null;
    // دالة لتحديد لون الكارت بناءً على القيمة
    const getAlertStyle = (type: string, value: number) => {
        if (type === 'humidity' && value > 80) return styles.blueAlert; // رطوبة عالية جداً
        if (type === 'wind' && value > 30) return styles.grayAlert; // رياح قوية
        if (type === 'uv' && value > 7) return styles.orangeAlert; // أشعة شمس خطيرة
        return null;
    };

    const details = [
        {
            label: 'Humidity',
            value: `${current.humidity}%`,
            icon: <Droplets color={current.humidity > 80 ? "#fff" : "#60a5fa"} size={20} />,
            style: getAlertStyle('humidity', current.humidity)
        },
        {
            label: 'Wind Speed',
            value: `${current.wind_kph} km/h`,
            icon: <Wind color={current.wind_kph > 30 ? "#fff" : "#60a5fa"} size={20} />,
            style: getAlertStyle('wind', current.wind_kph)
        },
        {
            label: 'UV Index',
            value: current.uv,
            icon: <Sun color={current.uv > 7 ? "#fff" : "#facc15"} size={20} />,
            style: getAlertStyle('uv', current.uv)
        },
        {
            label: 'Visibility',
            value: `${current.vis_km} km`,
            icon: <Eye color="#60a5fa" size={20} />,
            style: null
        },
    ];

    return (
        <View style={styles.container}>
            {details.map((item, index) => (
                <View key={index} style={[styles.card, item.style]}>
                    {item.icon}
                    <Text style={[styles.label, item.style && styles.whiteText]}>{item.label}</Text>
                    <Text style={[styles.value, item.style && styles.whiteText]}>{item.value}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 12,
        marginVertical: 15,
        paddingHorizontal: 15,
    },
    card: {
        width: width * 0.43,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: 15,
        borderRadius: 22,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    // تنبيهات الألوان
    blueAlert: { backgroundColor: '#2563eb', borderColor: '#60a5fa' },
    grayAlert: { backgroundColor: '#475569', borderColor: '#94a3b8' },
    orangeAlert: { backgroundColor: '#ea580c', borderColor: '#fb923c' },

    label: { color: '#94a3b8', fontSize: 12, marginTop: 8 },
    value: { color: '#fff', fontSize: 17, fontWeight: 'bold', marginTop: 4 },
    whiteText: { color: '#fff' }
});