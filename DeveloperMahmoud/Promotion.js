import React, { useState, useEffect, useContext } from "react";
import { ImageBackground, TouchableOpacity, StyleSheet, TextInput, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import db from "../db";
import UserContext from "../UserContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Service from "../DeveloperMahmoud/Service";
import styles from './SmartStyle'
import Dialog from "react-native-dialog";

export default function Promotion() {
  const { user } = useContext(UserContext);
  const [addsuppdialogVisible, setSuppAddDialogVisible] = useState(false)
  const [currPromotion, setCurrPromotion] = useState(null)
  const [warning, setWarning] = useState("")

  const [promotions, setPromotions] = useState([]);
  useEffect(() => db.Promotions.listenAll(setPromotions), []);

  const AddPromo = async () => {
    if (currPromotion.name != null && currPromotion.description != null) {
      await db.Promotions.create({ name: currPromotion.name, description: currPromotion.description, image: currPromotion.image ? currPromotion.image : 'http://www.pngall.com/wp-content/uploads/2016/07/Special-offer-Free-PNG-Image.png' })
      cancel()
    } else {
      setWarning("You need to name/desc fields!")
    }
  }

  const cancel = async () => {
    setSuppAddDialogVisible(false)
    setWarning("")
  }
  return (
    <ImageBackground source={require("../assets/images/background.png")} style={styles.background}>

      <View style={styles.Promotioncontainer}>
        <SafeAreaProvider style={styles.Promotioncontainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.Promotioncontainer}>
              {
                (user.role == "Support" || user.role == "Admin")
                &&
                <TouchableOpacity
                  onPress={() => {
                    setSuppAddDialogVisible(true)
                    setCurrPromotion([])
                  }}
                >
                  <Text style={styles.AddPromoButton}>
                    Add Promotion
              </Text>
                </TouchableOpacity>
              }
              {promotions.map((promotion) =>
              (<Service
                key={promotion.id}
                promotion={promotion}
              />)
              )
              }
            </View>
          </ScrollView>
        </SafeAreaProvider>
      </View>

      <Dialog.Container visible={addsuppdialogVisible}>
        <Dialog.Title>Add Promotion:</Dialog.Title>
        <View>
          <Text style={styles.redeemWarning}>
            {warning ? warning : ''}
          </Text>
          <Text>Name:</Text>
          <TextInput placeholder={'Enter Name'} onChangeText={(value) => currPromotion.name = value} />
          <Text>Description:</Text>
          <TextInput placeholder={'Enter Description'} onChangeText={(value) => currPromotion.description = value} multiline={true} />
          <Text>Image:</Text>
          <TextInput placeholder={'Insert Image URL/ Leave Empty For Default'} onChangeText={(value) => currPromotion.image = value} multiline={true} />
        </View>
        <Dialog.Button label="Cancel" onPress={cancel} />
        <Dialog.Button label="Add" onPress={AddPromo} />
      </Dialog.Container>

    </ImageBackground>

  );
}
