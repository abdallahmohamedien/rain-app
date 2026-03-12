import { getWardrobeAdvice } from '@/utils/weatherHelpers';
import { Shirt } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const WeatherWardrobe = ({ weather }: { weather: any }) => {
    const temp = weather?.current?.temp_c || 0;
    const condition = weather?.current?.condition?.text || '';

    const advice = getWardrobeAdvice(temp, condition);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Shirt color="#60a5fa" size={20} />
                <Text style={styles.title}>WEATHER WARDROBE</Text>
            </View>

            <Text style={styles.mainAdvice}>{advice.title}</Text>
            <Text style={styles.subtitle}>{advice.subtitle}</Text>

            <View style={styles.itemsRow}>

                {advice.items.map((item: string, index: number) => (
                    <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{item}</Text>
                    </View>
                ))}
                <View style={[styles.tag, styles.accessoryTag]}>
                    <Text style={styles.accessoryText}>+ {advice.accessory}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        marginHorizontal: 20,
        borderRadius: 25,
        padding: 20,
        marginTop: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
    title: { color: '#94a3b8', fontSize: 10, fontWeight: '800', letterSpacing: 1.5 },
    mainAdvice: { color: '#fff', fontSize: 22, fontWeight: '900' },
    subtitle: { color: '#64748b', fontSize: 13, marginTop: 4, lineHeight: 18 },
    itemsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 15 },
    tag: { backgroundColor: 'rgba(255, 255, 255, 0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
    tagText: { color: '#fff', fontSize: 12, fontWeight: '600' },
    accessoryTag: { backgroundColor: 'rgba(96, 165, 250, 0.2)', borderColor: '#60a5fa', borderWidth: 1 },
    accessoryText: { color: '#60a5fa', fontSize: 12, fontWeight: 'bold' }
});