import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import db from '../db'
import styles from './SmartStyle'
import PrintTime from './PrintTime'
export default function AdminSensorsLogs({ ...sentlog }) {

    const [category, setCategory] = useState([]);
    useEffect(() => db.Categories.listenOne(setCategory, sentlog.categoryId), []);

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
                    sentlog.logMessage.includes("Remove")
                    &&
                    <Text style={styles.LogsTextLogsMsgRemoved}>
                        {sentlog.logMessage}
                    </Text>
                }
                {
                    sentlog.logMessage.includes("Review")
                    &&
                    <Text style={styles.LogsTextLogsMsgReview}>
                        {sentlog.logMessage}
                    </Text>
                }
                {
                    sentlog.logMessage.includes("Request")
                    &&
                    <Text style={styles.LogsTextLogsMsgRequest}>
                        {sentlog.logMessage}
                    </Text>
                }
            </Text>
        </View>
    )
}