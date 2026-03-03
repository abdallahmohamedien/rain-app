import { Droplets } from 'lucide-react-native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export const HourlyList = ({ hours }: { hours: any[] }) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            style={styles.container}
        >
            {hours.slice(0, 24).map((item, index) => {
                // منطق تحديد قوة المطر لتغيير الاستايل
                const rainChance = item.chance_of_rain;
                const isHighRain = rainChance >= 50;
                const isHeavyRain = rainChance >= 80;

                return (
                    <View
                        key={index}
                        style={[
                            styles.hourCard,
                            isHighRain && styles.highRainCard, // لون أزرق متوسط
                            isHeavyRain && styles.heavyRainCard // لون أزرق غامق وقوي
                        ]}
                    >
                        <Text style={[styles.time, isHighRain && styles.whiteText]}>
                            {item.time.split(' ')[1]}
                        </Text>

                        <Image source={{ uri: `https:${item.condition.icon}` }} style={styles.icon} />

                        <View style={styles.rainContainer}>
                            <Droplets size={12} color={isHighRain ? "#fff" : "#60a5fa"} />
                            <Text style={[styles.rainChance, isHighRain && styles.whiteText]}>
                                {rainChance}%
                            </Text>
                        </View>
                    </View>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { marginTop: 15 },
    scrollContent: { paddingHorizontal: 20 },
    hourCard: {
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
        padding: 12,
        borderRadius: 20,
        marginRight: 12,
        width: 75,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    // ستايل للمطر المتوسط (50%+)
    highRainCard: {
        backgroundColor: 'rgba(96, 165, 250, 0.3)', // أزرق شفاف
        borderColor: '#60a5fa',
    },
    // ستايل للمطر الغزير (80%+)
    heavyRainCard: {
        backgroundColor: '#2563eb', // أزرق صريح
        borderColor: '#93c5fd',
        elevation: 5, // ظل خفيف للأندرويد
        shadowColor: '#60a5fa', // ظل للأيفون
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
    },
    time: { color: '#94a3b8', fontSize: 11, fontWeight: '500' },
    whiteText: { color: '#fff' }, // لتوضيح الخط فوق الخلفية الزرقاء
    icon: { width: 35, height: 35, marginVertical: 8 },
    rainContainer: { flexDirection: 'row', alignItems: 'center', gap: 3 },
    rainChance: { color: '#fff', fontWeight: 'bold', fontSize: 13 }
});