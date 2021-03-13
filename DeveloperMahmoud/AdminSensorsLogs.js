import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db from '../db'

export default function AdminSensorsLogs() {

    const [logs, setLogs] = useState([]);
    useEffect(() => db.Logs.listenAll(setLogs), []);

    console.log("logs:", logs.length);
    return (
        <SafeAreaProvider style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.ViewTitle}>
                    <Text style={styles.TextTitle}> SENSORS LOGS</Text>
                </View>

                <View style={styles.ViewDesc}>
                    <Text style={styles.TextDesc}>Track All Users Sensors</Text>
                </View>
                {
                    logs.map((log) => (
                        < View style={styles.ViewLogs} key={log.id}>
                            <Text style={styles.TextLogs}>
                                {log.logMessage}
                            </Text>
                        </View>
                    ))
                }
            </ScrollView>
        </SafeAreaProvider >

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#12232E"
    },
    ViewTitle: {
        backgroundColor: "#4DA8DA",
        height: 50,
        margin: 5,
        marginBottom: 10
    },
    TextTitle: {
        color: 'black',
        textAlign: "center",
        marginTop: 10,
        fontSize: 18
    },
    ViewDesc: {
        marginTop: 20,
        marginBottom: 5
    },
    TextDesc: {
        color: '#fff',
        textAlign: "center",
        fontSize: 15
    },
    ViewLogs: {
        color: '#000000',
        backgroundColor: '#000000'
    },
    TextLogs: {
        color: '#fff',
        textAlign: "left",
        fontSize: 12,
        fontFamily: 'Roboto'
    }
});