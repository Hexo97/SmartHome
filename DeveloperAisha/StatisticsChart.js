import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import db from '../db'
import {BarChart} from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function StatisticsChart({ }) {
    
    const[categories, setCategories] = useState([])
    useEffect(() => db.Categories.listenAll(setCategories),[] )

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

const styles = StyleSheet.create({
    tinyLogo: {
        width: 150,
        height: 150,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: 'center',
    },
    helpContainer: {
        marginTop: 15,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});