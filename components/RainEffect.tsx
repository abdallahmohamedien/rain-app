import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withTiming
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const DROP_COUNT = 30;

const RainDrop = () => {
    const translateY = useSharedValue(-100);
    const translateX = Math.random() * width;

    useEffect(() => {
        // التصحيح هنا: استخدام -1 للتكرار اللانهائي
        translateY.value = withDelay(
            Math.random() * 2000,
            withRepeat(
                withTiming(height + 100, { duration: 1000 + Math.random() * 1000 }),
                -1, // تكرار لانهائي
                false // لا يعود للخلف (Restart from top)
            )
        );
    }, [translateY]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }, { translateX }],
    }));

    return <Animated.View style={[styles.drop, animatedStyle]} />;
};

export const RainEffect = () => {
    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
            {[...Array(DROP_COUNT)].map((_, i) => (
                <RainDrop key={i} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    drop: {
        position: 'absolute',
        width: 2,
        height: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 1,
    },
});