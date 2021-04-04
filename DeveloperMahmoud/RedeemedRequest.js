import React, {  useState, useEffect } from "react";
import {  Image } from "react-native";
import { Card } from "react-native-elements";
import styles from './SmartStyle'
import db from '../db'
import ListPromoRequest from "./ListPromoRequest";

export default function RedeemedRequest({ request }) {

    const [checkPromotion, setPromotion] = useState([]);
    useEffect(() => {
        db.Promotions.ActivePromotions.listenToAll(setPromotion, request.id)
    }, []);

    return (
        <Card containerStyle={styles.redeemCard}>
            <Card.Title style={styles.redeemTitle}>
                {request.name}
            </Card.Title>
            <Image style={styles.redeemImage} source={{ uri: request.image }} />
            {
                    checkPromotion.map((req, i) => (
                        req.Status == 'on hold'
                        &&
                        <ListPromoRequest key={i} request={req} promo={request.id} />
                    )
                    )
            }
        </Card>
    );
}

