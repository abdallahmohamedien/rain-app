import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export const HourlyList = ({ hours }: { hours: any[] }) => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
            {hours.slice(0, 24).map((item, index) => (
                <View key={index} style={styles.hourCard}>
                    <Text style={styles.time}>{item.time.split(' ')[1]}</Text>
                    <Image source={{ uri: `https:${item.condition.icon}` }} style={styles.icon} />
                    <Text style={styles.temp}>{Math.round(item.temp_c)}°</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { marginTop: 30, paddingLeft: 20 },
    hourCard: {
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        padding: 15,
        borderRadius: 20,
        marginRight: 12,
        width: 70
    },
    time: { color: '#94a3b8', fontSize: 12 },
    icon: { width: 40, height: 40, marginVertical: 5 },
    temp: { color: '#fff', fontWeight: 'bold' }
});