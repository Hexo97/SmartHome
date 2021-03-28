import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import db from '../db'
import { BarChart } from "react-native-chart-kit";

export default function StatisticsChart({ }) {

    const [categories, setCategories] = useState([])
    useEffect(() => db.Categories.listenAll(setCategories), [])

    const chartConfig = {
        backgroundGradientFrom: "#0a94f0",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#0a94f0",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 0.1) => `rgba(0, 0, 1, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
    };

    const data = {
        labels: categories.map(r => r.name),
        datasets: [
            {
                data: categories.map(r => r.price)
            }
        ]
    };
    return (
        <View>
            <BarChart
                data={data}
                width={350}
                height={290}
                yAxisLabel=""
                chartConfig={chartConfig}
                verticalLabelRotation={30}
            />
        </View>
    );
}

