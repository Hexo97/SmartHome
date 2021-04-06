import React, { useEffect, useState, useContext } from "react";
import db from '../db'
import UserContext from '../UserContext'
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

export default function NotificationHeader({ nav }) {
    const { user } = useContext(UserContext);

    const [unreadNotifications, setUnreadNotifications] = useState([]);
    useEffect(() => db.Users.Notifications.listenToAllUnread(setUnreadNotifications, user.id), []);

    return (
        <TouchableOpacity
            style={{ marginRight: 20 }}
            onPress={() => { nav.navigate('Notifications') }}>
            {
                unreadNotifications.length > 0
                &&
                <Icon name='notifications-active' color='orange' size={25} />
            }
            {
                !(unreadNotifications.length > 0)
                &&
                <Icon name='notifications-none' color="grey" size={25} />
            }
        </TouchableOpacity>
    )
}