import { getDrivingIndex } from '@/utils/weatherHelpers';
import { Car } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const SafeDriving = ({ weather }: { weather: any }) => {
    const index = getDrivingIndex(weather);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.row}>
                    <Car color={index.color} size={18} />
                    <Text style={styles.title}>DRIVING SAFETY INDEX</Text>
                </View>
                <Text style={[styles.scoreText, { color: index.color }]}>{index.score}/10</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.label}>{index.label}</Text>
                <Text style={styles.advice}>{index.advice}</Text>
            </View>


            <View style={styles.progressBg}>
                <View style={[styles.progressFill, { width: `${index.score * 10}%`, backgroundColor: index.color }]} />
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
        marginTop: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    title: { color: '#94a3b8', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
    scoreText: { fontSize: 18, fontWeight: '900' },
    content: { marginBottom: 15 },
    label: { color: '#fff', fontSize: 18, fontWeight: '700' },
    advice: { color: '#64748b', fontSize: 12, marginTop: 4 },
    progressBg: { height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' },
    progressFill: { height: '100%', borderRadius: 3 }
});