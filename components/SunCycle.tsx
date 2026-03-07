import { Sunrise, Sunset } from 'lucide-react-native';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const SVG_HEIGHT = 100;

export const SunCycle = ({ sunData }: { sunData: { sunrise: string, sunset: string } }) => {
    // دالة بسيطة لتحويل الوقت (06:30 AM) لنسبة مئوية من اليوم
    const calculateSunPosition = () => {
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        // افتراضياً الشروق 6AM والغروب 6PM لو مفيش داتا دقيقة
        const startMinutes = 6 * 60;
        const endMinutes = 18 * 60;

        const totalDaylight = endMinutes - startMinutes;
        const elapsed = currentMinutes - startMinutes;

        return Math.max(0, Math.min(1, elapsed / totalDaylight));
    };

    const progress = calculateSunPosition();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sun & Moon Path</Text>

            <View style={styles.svgWrapper}>
                <Svg height={SVG_HEIGHT} width={CARD_WIDTH - 40}>
                    <Defs>
                        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                            <Stop offset="0" stopColor="#fbbf24" stopOpacity="1" />
                            <Stop offset="1" stopColor="#f59e0b" stopOpacity="1" />
                        </LinearGradient>
                    </Defs>

                    {/* رسم القوس المنقط (المسار) */}
                    <Path
                        d={`M 10 ${SVG_HEIGHT} A ${(CARD_WIDTH - 60) / 2} ${SVG_HEIGHT - 20} 0 0 1 ${CARD_WIDTH - 50} ${SVG_HEIGHT}`}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                    />

                    {/* الشمس المتحركة - نستخدم الـ progress لتحديد مكانها */}
                    <Circle
                        cx={10 + (CARD_WIDTH - 60) * progress}
                        cy={SVG_HEIGHT - (Math.sin(Math.PI * progress) * (SVG_HEIGHT - 20))}
                        r="8"
                        fill="url(#grad)"
                    />
                </Svg>
            </View>

            <View style={styles.footer}>
                <View style={styles.timeBox}>
                    <Sunrise color="#fbbf24" size={16} />
                    <Text style={styles.timeText}>{sunData.sunrise || "06:12 AM"}</Text>
                </View>
                <View style={styles.timeBox}>
                    <Sunset color="#f59e0b" size={16} />
                    <Text style={styles.timeText}>{sunData.sunset || "05:45 PM"}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        marginHorizontal: 20,
        borderRadius: 25,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        marginTop: 15
    },
    title: {
        color: '#94a3b8',
        fontSize: 12,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 20
    },
    svgWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    timeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    },
    timeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600'
    }
});