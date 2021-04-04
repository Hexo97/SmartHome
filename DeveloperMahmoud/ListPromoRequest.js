import React, { useState, useEffect } from "react";
import { ListItem, Button } from "react-native-elements";
import styles from './SmartStyle'
import db from '../db'

export default function ListPromoRequest({ request, promo }) {
    const [requestUser, setRequestUser] = useState(null);
    useEffect(() => db.Users.listenOne(setRequestUser, request.userId), [request]);

    const process = async (status) => {
        await db.Promotions.ActivePromotions.updateActivePromo(promo, request.id, { ...request, Status: status });
        await db.Users.Notifications.createNotification(requestUser.id,
            {
                userId: requestUser.id,
                message: 'Your maintenance promotion has been processed successfully!',
                date: new Date(),
                isRead: false
            }
        )
    };

    return (
        <ListItem key={request.id} containerStyle={styles.listRequest}>
            <Text>{requestUser ? requestUser.name : 'Retrieving name'}</Text>
            <Text style={styles.processPromoStatus}>{request.Status}</Text>
            <Button
                onPress={() => process('Processed')}
                title="Process"
                buttonStyle={styles.processPromoButton}
            />
        </ListItem>
    );
}

