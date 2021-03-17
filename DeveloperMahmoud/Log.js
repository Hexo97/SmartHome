import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db from '../db'
import styles from './SmartStyle'
import PrintTime from './PrintTime'
export default function AdminSensorsLogs({ ...sentlog }) {


    const [category, setCategory] = useState([]);
    useEffect(() => db.Categories.listenOne(setCategory, sentlog.categoryId), []);
    console.log("cate:", category.name);

    return (
        < View style={styles.LogsViewLogs} key={sentlog.id}>
            <Text style={styles.LogsTextLogs}>
                [{PrintTime(sentlog.date.toDate())}]
                [{sentlog.sensorId.substring(0, 5)}]{' '}
                {/* [{sentlog.categoryId.substring(0, 5)}] */}
                [{category.name}]
                {
                    sentlog.logMessage.includes("Creat")
                    &&
                    <Text style={styles.LogsTextLogsMsgCreate}>
                        {sentlog.logMessage}
                    </Text>
                }
                {
                    sentlog.logMessage.includes("Report")
                    &&
                    <Text style={styles.LogsTextLogsMsgReported}>
                        {sentlog.logMessage}
                    </Text>
                }
                {
                    sentlog.logMessage.includes("Removed")
                    &&
                    <Text style={styles.LogsTextLogsMsgRemoved}>
                        {sentlog.logMessage}
                    </Text>
                }


            </Text>
        </View>
    )
}