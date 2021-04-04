import React, { useContext, useState, useEffect } from "react";
import { TouchableOpacity, Text, Image, ScrollView, TextInput } from "react-native";
import { View } from "../components/Themed";
import { Card } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CategoryByUserPicker from "../screens/pickers/CategoryByUserPicker";
import SensorByUserAndCategoryPicker from "../screens/pickers/SensorByUserAndCategoryPicker";
import Dialog from "react-native-dialog";
import styles from './SmartStyle'
import UserContext from "../UserContext";
import db from '../db'
import { useFocusEffect } from "@react-navigation/native";

export default function Service({ promotion }) {
  const { user } = useContext(UserContext);

  const [category, setCategory] = useState(null)
  const [sensor, setSensor] = useState(null)
  const [warning, setWarning] = useState("")
  const [currPromotion, setCurrPromotion] = useState(promotion)

  const [CustomerdialogVisible, setCustomerDialogVisible] = useState(false)
  const [suppdialogVisible, setSuppDialogVisible] = useState(false)
  const [deleteSuppDialogVisible, setDeleteSuppDialogVisible] = useState(false)

  // customer;button redeem doesn't show if exists
  const [checkPromotion, setPromotion] = useState([]);
  const [checkActivePromotion, setService] = useState([]);
  useEffect(() => {
    db.Promotions.ActivePromotions.listenToAllAPByUser(setPromotion, setService, user.id)
  }, [promotion]);
  useEffect(() => {
    db.Promotions.ActivePromotions.listenToAllAPByUser(setPromotion, setService, user.id)
  }, [CustomerdialogVisible]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // do this when focused
  //     // db.Promotions.ActivePromotions.listenToAllAPByUser(setPromotion, setService, user.id)
  //     return async () => {
  //       // Do something when the screen is unfocused
  //       await db.Promotions.ActivePromotions.listenToAllAPByUser(setPromotion, setService, user.id)
  //     };
  //   }, [CustomerdialogVisible])
  // );

  const Redeem = async () => {
    if (category && sensor) {
      await db.Promotions.ActivePromotions.createAP(promotion.id,
        {
          userId: user.id,
          sensorId: sensor.id,
          categoryId: sensor.categoryid,
          RedeemedDate: new Date(),
          Status: `on hold`
        })
      await db.Logs.create(
        {
          sensorId: sensor.id,
          categoryId: sensor.categoryid,
          date: new Date(),
          logMessage: ` Service Requested`
        })
      cancel()
    } else if (promotion.name.includes("Discount")) {
      await db.Promotions.ActivePromotions.createAP(promotion.id,
        {
          userId: user.id,
          RedeemedDate: new Date(),
          Status: `Redeemed`
        })
      cancel()
    } else {
      setWarning("You need to select required fields!")
    }
  };

  const EditPromo = async () => {
    await db.Promotions.update({ id: promotion.id, name: currPromotion.name, description: currPromotion.description, image: currPromotion.image })
    cancel()
  };

  const DeletePromo = async () => {
    await db.Promotions.remove(promotion.id)
    cancel()
  };

  const cancel = async () => {
    setCustomerDialogVisible(false)
    setSuppDialogVisible(false)
    setDeleteSuppDialogVisible(false)
    setWarning("")
  }

  return (
    <SafeAreaProvider style={styles.redeemContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.redeemContainer}>

          <Card containerStyle={styles.redeemCard}>
            <Card.Title
              style={styles.redeemTitle}
            >
              {promotion.name}
            </Card.Title>
            <Image
              style={styles.redeemImage}
              source={{ uri: promotion.image }}
            />
            <Text
              style={styles.redeemDesc}
            >
              Description:
              </Text>
            <Text
              style={styles.redeemServDesc}
            >
              {promotion.description}
            </Text>
            {
              (user.role == "Support" || user.role == "Admin")
              &&
              <TouchableOpacity
                onPress={() => {
                  setSuppDialogVisible(true)
                }}
              >
                <Text style={styles.RedeemButton}>
                  Edit
              </Text>
              </TouchableOpacity>
            }
            {
              (user.role == "Support" || user.role == "Admin")
              &&
              <TouchableOpacity
                onPress={() => {
                  setDeleteSuppDialogVisible(true)
                }}
              >
                <Text style={styles.RedeemButton}>
                  Delete
              </Text>
              </TouchableOpacity>
            }

            {
              // this is Mahmoud, this is my second time to be proud of figuring this out. thanks for reading
              (
                (
                  checkPromotion
                  &&
                  checkActivePromotion
                )
                &&
                !(
                  checkPromotion.name == promotion.name
                  &&
                  checkActivePromotion.userId == user.id
                )
              )
              &&
              user.role == "Customer"
              &&
              <TouchableOpacity
                onPress={() => {
                  setCustomerDialogVisible(true)
                }}
                style={styles.title}
              >
                <Text style={styles.RedeemButton}>
                  Redeem
              </Text>
              </TouchableOpacity>
            }

          </Card>


          <Dialog.Container visible={CustomerdialogVisible}>
            <Dialog.Title>Redeem Voucher</Dialog.Title>
            <View style={styles.redeemDialogContent}>
              <Text style={styles.redeemWarning}>
                {warning ? warning : ''}
              </Text>
              {
                promotion.name.includes("Maintenance")
                &&
                <CategoryByUserPicker set={setCategory} />
              }
              {
                category
                &&
                <SensorByUserAndCategoryPicker category={category} set={setSensor} />
              }
            </View>
            <Dialog.Button label="Cancel" onPress={cancel} />
            <Dialog.Button label="Redeem" onPress={Redeem} />
          </Dialog.Container>

          <Dialog.Container visible={suppdialogVisible}>
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
                multiline={true}
              />

              <Text>Image:</Text>
              <TextInput
                placeholder={currPromotion ? currPromotion.image : 'Insert Image URL'}
                defaultValue={currPromotion ? currPromotion.image : 'Insert Image URL'}
                onChangeText={(value) => currPromotion.image = value}
                multiline={true}
              />
            </View>

            <Dialog.Button label="Cancel" onPress={cancel} />
            <Dialog.Button label="Update" onPress={EditPromo} />
          </Dialog.Container>

          <Dialog.Container visible={deleteSuppDialogVisible}>
            <Dialog.Title>Delete Promotion:</Dialog.Title>
            <View>
              <Text>Name:</Text>
              <Text>{currPromotion.name}</Text>
            </View>
            <Dialog.Button label="Cancel" onPress={cancel} />
            <Dialog.Button label="Delete" onPress={DeletePromo} />
          </Dialog.Container>


        </View>
      </ScrollView>
    </SafeAreaProvider >

  );
}

