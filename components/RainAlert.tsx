import { AlertTriangle } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const RainAlert = ({ condition }: { condition: string }) => {
    // هل الحالة تستدعي التنبيه؟
    const isAlertNeeded = condition.toLowerCase().includes('rain') ||
        condition.toLowerCase().includes('storm') ||
        condition.toLowerCase().includes('thunder');

    if (!isAlertNeeded) return null;

    return (
        <View style={styles.alertContainer}>
            <AlertTriangle color="#fff" size={20} />
            <View style={styles.textContainer}>
                <Text style={styles.alertTitle}>Weather Warning</Text>
                <Text style={styles.alertMessage}>
                    {condition} expected today. Do not forget your umbrella! ☔
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    alertContainer: {
        backgroundColor: '#dc2626', // أحمر تحذيري صريح
        marginHorizontal: 20,
        marginTop: 10,
        padding: 15,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderWidth: 1,
        borderColor: '#ef4444',
    },
    textContainer: {
        flex: 1,
    },
    alertTitle: {
        color: '#fff',
        fontWeight: '900',
        fontSize: 14,
        textTransform: 'uppercase',
    },
    alertMessage: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 13,
        fontWeight: '500',
    },
}); 