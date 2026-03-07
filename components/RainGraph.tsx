import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export const RainGraph = ({ hours }: { hours: any[] }) => {
    const sampleData = hours.filter((_, index) => index % 3 === 0).slice(0, 8);

    const data = {
        labels: sampleData.map(h => h.time.split(' ')[1]),
        datasets: [{
            data: sampleData.map(h => h.chance_of_rain || 0),
            color: (opacity = 1) => `rgba(96, 65, 250, ${opacity})`,
            strokeWidth: 3
        }]
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>Precipitation Probability</Text>

                <View style={styles.liveBadge}>
                    <Text style={styles.liveText}>24H TREND</Text>
                </View>
            </View>

            <LineChart
                data={data}
                width={Dimensions.get('window').width - 60}
                height={200}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
                withDots={true}
                withShadow={true}
                withInnerLines={true}
                withOuterLines={false}
                fromZero={true}
                yAxisLabel=""
                yAxisSuffix="%"
                verticalLabelRotation={0}
            />
        </View>
    );
};

const chartConfig = {
    backgroundGradientFrom: '#1e293b',
    backgroundGradientTo: '#1e293b',
    fillShadowGradient: '#60a5fa',
    fillShadowGradientOpacity: 0.2,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(96, 165, 250, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(148, 163, 184, ${opacity})`,
    propsForBackgroundLines: {
        strokeDasharray: "5",
        stroke: "rgba(255, 255, 255, 0.05)"
    },
    propsForDots: {
        r: "5",
        strokeWidth: "2",
        stroke: "#0f172a"
    }
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        alignItems: 'center',
        backgroundColor: '#1e293b',
        borderRadius: 30,
        paddingVertical: 20,
        marginHorizontal: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    liveBadge: {
        backgroundColor: 'rgba(96, 165, 250, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 5,
    },
    liveText: {
        color: '#60a5fa',
        fontSize: 9,
        fontWeight: 'bold',
    },
    chart: {
        paddingRight: 45,
        borderRadius: 20,
        marginLeft: 50,
    }
});