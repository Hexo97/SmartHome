import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, FlatList, ImageBackground } from "react-native";
import db from "../db";
import { SafeAreaProvider } from "react-native-safe-area-context";
import UserContext from '../UserContext'
import { Button } from "react-native-elements";
import Notification from './Notification'

export default function Notifications() {
    const { user } = useContext(UserContext)

    const [notifications, setNotifications] = useState([]);
    useEffect(() => db.Users.Notifications.listenToUserNotifications(setNotifications, user.id), []);
    // console.log("notifications: ", notifications);

    const [unreadNotifications, setUnreadNotifications] = useState([]);
    useEffect(() => db.Users.Notifications.listenToAllUnread(setUnreadNotifications, user.id), []);
    // console.log("notification unread:", unreadNotifications.length);

    const createNotification = async () => {
        console.log("creating notification")
        await db.Users.Notifications.createNotification(
            user.id,
            {
                userId: user.id,
                message: 'this is notification',
                date: new Date(),
                isRead: false
            }
        )
    };

    return (
        <SafeAreaProvider style={styles.container}>
            <ImageBackground source={require("../assets/images/background.png")} style={{ width: '100%', height: '100%' }}>
                <Button
                    title="create"
                    onPress={createNotification}
                />
                <FlatList
                    data={
                        [...notifications]
                    }
                    renderItem={({ item }) =>
                        <Notification notification={item} />
                        // <Text style={styles.oneNotification}>{item.message}</Text>
                    }
                    keyExtractor={item => item.id}
                />
            </ImageBackground>

        </SafeAreaProvider>
    )

}
const styles = StyleSheet.create({
    oneNotification: {
        color: 'white',
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: 60,
        color: "white"
    }
});
