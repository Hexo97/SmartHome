import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from '../../components/Themed';
import MotionInfo from './MotionInfo'
import TemperatureInfo from './TemperatureInfo'
import CategoryByUserPicker from '../pickers/CategoryByUserPicker';
import { Input } from "react-native-elements";
import SensorByUserAndCategoryPicker from '../pickers/SensorByUserAndCategoryPicker';
import Colors from "../../constants/Colors";
import UserContext from '../../UserContext'
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import { Button } from 'react-native'
import { TextInput } from "react-native";
import db from '../../db'


export default function SensorsScreen() {

  const { user } = useContext(UserContext)
  useEffect(() => setCategory(null), [user])
  const [category, setCategory] = useState(null)
  useEffect(() => setSensor(null), [category])
  const [sensor, setSensor] = useState(null)
  


  const createRequest = async (sensor) => {
    console.log("###sensor:", sensor);
    console.log("###category:", category);

    if (!message) {
      setAlert(true)
    }
    else {
      await db.Reports.create({
        sensorId: sensor.sensor.id,
        userId: user.id,
        message: message,
        dateCreated: new Date(),
        status: "Pending"
      });
      setVisible(false)
    }
  };

  const [visible, setVisible] = useState(false)
  const [alert, setAlert] = useState(false)
  const [message, setMessage] = useState("")


  // console.log(user, category, sensor)

  return (
    <View>
      <View style={styles.getStartedContainer}>
        {
          user
          &&
          <CategoryByUserPicker set={setCategory} />
        }
        {
          user
          &&
          category
          &&
          <SensorByUserAndCategoryPicker category={category} set={setSensor} />
        }
        {
          user
          &&
          category
          &&
          sensor
          &&
          <>
            {
              category.name === "Motion"
              &&
              <MotionInfo user={user} category={category} sensor={sensor} />
            }
            {
              category.name === "Temperature"
              &&
              <TemperatureInfo user={user} category={category} sensor={sensor} />
            }


            <View>
              <Button
                title="Report Sensor"
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
                  {
                    alert
                    &&
                    <Text style={styles.alert}>Please enter a message</Text>
                  }

                </DialogContent>
              </Dialog>
            </View>

          </>
        }
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 150,
    height: 150,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
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
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  alert: {
    color: "red",
    textAlign: "center"
  },
});
