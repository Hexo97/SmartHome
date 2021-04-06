import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, FlatList, ImageBackground } from "react-native";
import db from "../db";
import { SafeAreaProvider } from "react-native-safe-area-context";
import UserContext from '../UserContext'
import { Button } from "react-native-elements";
import Notification from './Notification'
import styles from './SmartStyle'

export default function Notifications() {
    const { user } = useContext(UserContext)

    const [notifications, setNotifications] = useState([]);
    useEffect(() => db.Users.Notifications.listenToUserNotifications(setNotifications, user.id), []);

    const [unreadNotifications, setUnreadNotifications] = useState([]);
    useEffect(() => db.Users.Notifications.listenToAllUnread(setUnreadNotifications, user.id), []);

    // const createNotification = async () => {
    //     await db.Users.Notifications.createNotification(
    //         user.id,
    //         {
    //             userId: user.id,
    //             message: 'this is notification',
    //             date: new Date(),
    //             isRead: false
    //         }
    //     )
    // };

    return (
        <SafeAreaProvider style={styles.notificationContainer}>
            <ImageBackground source={require("../assets/images/background.png")} style={styles.background}>
                {/* <Button
                    title="create"
                    onPress={createNotification}
                /> */}
                <FlatList
                    data={
                        [...notifications]
                    }
                    renderItem={({ item }) =>
                        <Notification notification={item} />
                    }
                    keyExtractor={item => item.id}
                />
            </ImageBackground>

        </SafeAreaProvider>
    )

}