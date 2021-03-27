import React from "react";
import {
    Text,
    TextInput
} from "react-native";
import { View } from "../components/Themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Dialog from "react-native-dialog";
import styles from './SmartStyle'
import db from '../db'

export default function SuppDialog({ currPromotion }) {

    const EditPromo = async () => {
        console.log("curr:", currPromotion);
        await db.Promotions.update({ id: promotion.id, name: currPromotion.name, description: currPromotion.description, image: currPromotion.image })
        cancel()
    };

    const cancel = async () => {
        setDialogVisible(false)
        setSuppDialogVisible(false)
        setWarning("")
    }

    return (
        <SafeAreaProvider style={styles.redeemContainer}>

            <Dialog.Title>Edit Service:</Dialog.Title>
            <View>
                <Text>Name:</Text>
                <TextInput
                    placeholder={currPromotion ? currPromotion.name : 'Enter Name'}
                    defaultValue={currPromotion ? currPromotion.name : 'Enter Name'}
                    onChangeText={(value) => currPromotion.name = value}
                />

                <Text>Description:</Text>
                <TextInput
                    placeholder={currPromotion ? currPromotion.description : 'Enter Description'}
                    defaultValue={currPromotion ? currPromotion.description : 'Enter Description'}
                    onChangeText={(value) => currPromotion.description = value}
                />

                <Text>Image:</Text>
                <TextInput
                    placeholder={currPromotion ? currPromotion.image : 'Insert Image URL'}
                    defaultValue={currPromotion ? currPromotion.image : 'Insert Image URL'}
                    onChangeText={(value) => currPromotion.image = value}
                />
            </View>

            <Dialog.Button label="Cancel" onPress={cancel} />
            <Dialog.Button label="Update" onPress={EditPromo} />
        </SafeAreaProvider>
    );
}