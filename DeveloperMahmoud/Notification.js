import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import db from "../db";
import UserContext from '../UserContext'
import { useFocusEffect } from "@react-navigation/native";

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
        <View style={notification.isRead ? styles.notificationContainerRead : styles.notificationContainer}>
            <Text style={styles.notificationMsg}>
                {notification.message}
            </Text>
            <Text style={styles.notificationTime}>
                {notification.date.toDate().toLocaleTimeString('en-US')}
            </Text>
        </View>
    )

}
const styles = StyleSheet.create({
    notificationContainer: {
        width: 400,
        height: 75,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
    },
    notificationContainerRead: {
        width: 400,
        height: 75,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        backgroundColor: 'lightgrey',
        opacity: 0.7
    },
    notificationTxtContainer: {
        backgroundColor: 'red'
    },
    notificationMsg: {
        color: 'black',
        textAlign: 'left',
        fontSize: 15,
        marginTop: 18,
        marginLeft: 10,
    },
    notificationTime: {
        color: 'grey',
        marginLeft: 10,
    }
});
