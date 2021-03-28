import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db from '../db'
import styles from './SmartStyle'
import SingleLog from './Log'

export default function AdminSensorsLogs() {

    const [logs, setLogs] = useState([]);
    useEffect(() => db.Logs.listen2OrderByWhen(setLogs), []);

    return (
        <SafeAreaProvider style={styles.Logscontainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.LogsViewTitle}>
                    <Text style={styles.LogsTextTitle}> SENSORS LOGS</Text>
                </View>
                <View style={styles.LogsViewDesc}>
                    <Text style={styles.LogsTextDesc}>Track All Users Sensors</Text>
                </View>
                {
                    logs.map((log) => (
                        <SingleLog key={log.id} {...log} />
                    ))
                }
            </ScrollView>
        </SafeAreaProvider >
    )
}