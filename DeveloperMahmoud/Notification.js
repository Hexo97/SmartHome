import React, { useContext } from "react";
import { Text, View } from "../components/Themed";
import db from "../db";
import UserContext from '../UserContext'
import { useFocusEffect } from "@react-navigation/native";
import styles from './SmartStyle'

export default function Notifications({ notification }) {
    const { user } = useContext(UserContext);

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                db.Users.Notifications.updateNotification(user.id,notification.id,{...notification,isRead:true})
            };
        }, [])
    );

    return (
        <View style={notification.isRead ? styles.notificationContainerRead : styles.oneNotificationContainer}>
            <Text style={styles.notificationMsg}>
                {notification.message}
            </Text>
            <Text style={styles.notificationTime}>
                {notification.date.toDate().toLocaleTimeString('en-US')}
            </Text>
        </View>
    )

}