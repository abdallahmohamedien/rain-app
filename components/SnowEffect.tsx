import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withTiming
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const FLAKE_COUNT = 40;

const SnowFlake = () => {
    const translateY = useSharedValue(-10);
    const translateX = useSharedValue(Math.random() * width);
    const scale = Math.random() * 0.8 + 0.2;
    const opacity = Math.random() * 0.5 + 0.3;

    useEffect(() => {

        translateY.value = withRepeat(
            withDelay(
                Math.random() * 5000,
                withTiming(height + 10, {
                    duration: 4000 + Math.random() * 3000,
                    easing: Easing.linear
                })
            ),
            -1,
            false
        );


        translateX.value = withRepeat(
            withTiming(translateX.value + (Math.random() > 0.5 ? 20 : -20), {
                duration: 2000 + Math.random() * 1000,
                easing: Easing.inOut(Easing.ease)
            }),
            -1,
            true
        );
    }, [translateY, translateX]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: translateY.value },
            { translateX: translateX.value },
            { scale: scale }
        ],
        opacity: opacity,
    }));

    return <Animated.View style={[styles.flake, animatedStyle]} />;
};

export const SnowEffect = () => {
    return (
        <View style={[StyleSheet.absoluteFill, { zIndex: 1 }]} pointerEvents="none">
            {[...Array(FLAKE_COUNT)].map((_, i) => (
                <SnowFlake key={i} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    flake: {
        position: 'absolute',
        width: 8,
        height: 8,
        backgroundColor: '#fff',
        borderRadius: 4,
    },
});