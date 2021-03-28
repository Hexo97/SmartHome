import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, Image, ScrollView, TextInput } from "react-native";
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
  const [addsuppdialogVisible, setSuppAddDialogVisible] = useState(false)
  const [deleteSuppDialogVisible, setDeleteSuppDialogVisible] = useState(false)

  const [checkPromotion, setPromotion] = useState([]);
  const [checkActivePromotion, setService] = useState([]);
  useEffect(() => {
    db.Promotions.ActivePromotions.listenToAllAPByUser(setPromotion, setService, user.id)
  }, [promotion]);


  useFocusEffect(
    React.useCallback(() => {
      // do this when focused
      console.log("focused");
      // db.Promotions.ActivePromotions.listenToAllAPByUser(setPromotion, setService, user.id)
      return () => {
        // Do something when the screen is unfocused
        console.log("unfocused");
        // db.Promotions.ActivePromotions.listenToAllAPByUser(setPromotion, setService, user.id)
      };
    }, [])
  );


  // console.log("promotion", promotion.name);
  // console.log(checkActivePromotion.userId == user.id);
  // console.log(checkPromotion.name == promotion.name);

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

  const AddPromo = async () => {
    if (currPromotion.name != null && currPromotion.description != null) {
      await db.Promotions.create({ name: currPromotion.name, description: currPromotion.description, image: currPromotion.image ? currPromotion.image : 'http://www.pngall.com/wp-content/uploads/2016/07/Special-offer-Free-PNG-Image.png' })
      cancel()
    } else {
      setWarning("You need to name/desc fields!")
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
    setSuppAddDialogVisible(false)
    setDeleteSuppDialogVisible(false)
    setWarning("")
  }

  return (
    <SafeAreaProvider style={styles.redeemContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.redeemContainer}>
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
          <Card>
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
              // console.log("checkPromotion:", checkPromotion, "&&& promotion.name", promotion.name),
              // console.log("checkActivePromotion:", checkActivePromotion, "### user.id", user.id),
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
              {
                promotion.name.includes("Discount")
              }
            </View>
            <Dialog.Button label="Cancel" onPress={cancel} />
            <Dialog.Button label="Redeem" onPress={Redeem} />
          </Dialog.Container>


          <Dialog.Container visible={suppdialogVisible}>
            {/* <SuppDialog currPromotion={currPromotion} /> */}
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