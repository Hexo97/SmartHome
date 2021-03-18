import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { View, Text } from "../../components/Themed";
import SoundInfo from "../../DeveloperHanan/SoundInfo";
import CategoryByUserPicker from "../pickers/CategoryByUserPicker";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SensorByUserAndCategoryPicker from "../pickers/SensorByUserAndCategoryPicker";
import UserContext from "../../UserContext";
import { Button, Icon, AirbnbRating } from "react-native-elements";
import db from '../../db'
import ProximityInfo from '../../DeveloperAisha/ProximityInfo'


export default function SensorsScreen({ navigation }) {

  const { user } = useContext(UserContext)
  const [category, setCategory] = useState(null)
  const [sensor, setSensor] = useState(null)
  const [visible, setVisible] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [reviewVisible, setReviewVisible] = useState(false)
  const [visible, setVisible] = useState(false)
  const [alert, setAlert] = useState(false)
  const [reviewAlert, setReviewAlert] = useState(false)
  const [message, setMessage] = useState("")
  const [reviewMessage, setReviewMessage] = useState("")
  const [rating, setRating] = useState(0)

  const createRequest = async (sensor) => {
    if (!message) {
      setAlert(true);
    } else {
      await db.Reports.create({
        sensorId: sensor.sensor.id,
        userId: user.id,
        message: message,
        dateCreated: new Date(),
        status: "Pending",
      });
      setVisible(false);
    }
  };
  
  const createReview = async (category, reviewMsg) => {
    if (!reviewMsg) {
      setReviewAlert(true)
    }
    else {
      const review = { rating, categoryId: category.id, reviewMsg, date: new Date(), userId: user.id };
      // console.log("review:",review);
      await db.Categories.Reviews.createReview(category.id, review);
      console.log("here");
      setReviewVisible(false)
      setReviewMessage("")
    }
  };

  useEffect(() => setCategory(null), [user])
  useEffect(() => setSensor(null), [category])

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={{ backgroundColor: "#4DA8DA", height: 50, margin: 5, marginBottom: 10 }}>
          <Text style={{ color: 'black', textAlign: "center", marginTop: 10, fontSize: 20, fontWeight: "bold", fontStyle: "italic" }}>Control Sensors</Text>
        </View>
        <Button
          title="View All Sensors"
          type="outline"
          onPress={() => navigation.navigate('AllUserSensors')}
        />
        {
          user
          &&
          <View style={styles.getStartedContainer}>
            <CategoryByUserPicker set={setCategory} />
          </View>
        }
        {
          user
          &&
          category
          &&
          <View style={styles.getStartedContainer}>
            <SensorByUserAndCategoryPicker category={category} set={setSensor} />
          </View>
        }
        {
          user
          &&
          <View style={styles.getStartedContainer}>
            <CategoryByUserPicker set={setCategory} />
          </View>
        }
          <View>
            <Icon
              name="report"
              type="material-icons"
              size={20}
              reverse
              containerStyle={{
                left: "42.5%"
              }}
              color="#f50"

              onPress={() => {
                setVisible(true)
              }}
            />
            <Dialog
              style={{ width: "80%" }}
              visible={visible}
              footer={
                <DialogFooter>
                  <DialogButton
                    text="CANCEL"
                    onPress={() => {
                      setVisible(false),
                        setMessage(""),
                        setAlert(false)
                    }
                    }
                  />
                  <DialogButton
                    text="OK"
                    onPress={() => {
                      createRequest({ sensor }),
                        setMessage("")
                    }
                    }
                  />
                </DialogFooter>
              }
              onTouchOutside={() => {
                setVisible(false);
              }}
            >
              <DialogContent>
                <TextInput
                  style={{ fontSize: 15, alignItems: "center" }}
                  style={styles.TextInput}
                  placeholder="Report Message"
                  value={message}
                  onChangeText={(value) => setMessage(value)}
                />
                {category.name === "Sound" && (
                  <SoundInfo user={user} category={category} sensor={sensor} />
                )}
                {
                  category.name === "Proximity"
                  &&
                  <ProximityInfo user={user} category={category} sensor={sensor} />
                }
                <View style={styles.space} />
                <Button
                  title="Report Sensor" />
              </DialogContent>
            </Dialog>
          </View>
          <View>
            <Icon
              name="star"
              type="ant-design"
              size={20}
              reverse
              containerStyle={{
                left: "42.5%"
              }}
              color="#f50"

              onPress={() => {
                setReviewVisible(true)
              }}
            />
            <Dialog
              style={{ width: "80%" }}
              visible={reviewVisible}
              footer={
                <DialogFooter>
                  <DialogButton
                    text="CANCEL"
                    onPress={() => {
                      setReviewVisible(false),
                        setReviewMessage(""),
                        setReviewAlert(false)
                    }
                    }
                  />
                  <DialogButton
                    text="OK"
                    onPress={() => {
                      createReview(category, reviewMessage)
                    }
                    }
                  />
                </DialogFooter>
              }
              onTouchOutside={() => {
                setReviewVisible(false);
              }}
            >
              <DialogContent>
                <TextInput
                  style={{ fontSize: 15, alignItems: "center" }}
                  style={styles.TextInput}
                  placeholder="Leave your review here ..."
                  value={reviewMessage}
                  onChangeText={(value) => setReviewMessage(value)}
                />
                <AirbnbRating
                  count={5}
                  reviews={["Bad", "OK", "Good", "Perfect", "Done"]}
                  defaultRating={1}
                  size={20}
                  onPress={setRating}
                  onFinishRating={rating => setRating(rating)}
                />
                {
                  reviewAlert
                  &&
                  <Text style={styles.alert}>Please enter a review</Text>
                }
              </DialogContent>
            </Dialog>
          </View>
      </ScrollView>
    </SafeAreaProvider >
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 150,
    height: 150,
  },
  space: {
    width: 0, // or whatever size you need
    height: 5,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#12232E"
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#EEFBFB",
    borderRadius: 10,
    borderBottomColor: "black",
    borderWidth: 2
  },
  developmentModeText: {
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  contentContainer: {
    paddingTop: 30,
  },
  TextInput: {
    width: 200,
    height: 50,
    fontSize: 15,
    padding: 10,
    color: "#12232E",
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)",
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  alert: {
    color: "red",
    textAlign: "center"
  },
});
