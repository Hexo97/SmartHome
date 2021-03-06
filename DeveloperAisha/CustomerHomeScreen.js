import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, Image, ScrollView, ImageBackground, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { View } from '../components/Themed';
import { Button, Badge } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import UserContext from '../UserContext'
import db from '../db'
import fb from '../fb'
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from "react-native-elements";
import { color } from 'react-native-reanimated';

export default function CustomerHomeScreen({ navigation }) {

  const { user } = useContext(UserContext)
  // const [sound, setSound] = React.useState();


  // async function playSound() {
  //   console.log('Loading Sound');
  //   const { sound } = await Audio.Sound.createAsync(
  //      require('./assets/Hello.mp3')
  //   );
  //   setSound(sound);

  //   console.log('Playing Sound');
  //   await sound.playAsync(); }

  //   React.useEffect(() => {
  //     return sound
  //       ? () => {
  //           console.log('Unloading Sound');
  //           sound.unloadAsync(); }
  //       : undefined;
  //   }, [sound]);

  const [dt, setDt] = useState(new Date().toLocaleString());
  useEffect(() => {
    let secTimer = setInterval(() => {
      setDt(new Date().toLocaleString())
    }, 1000)

    return () => clearInterval(secTimer);
  }, []);
  const [fullUser, setUser] = useState(null)
  useEffect(() => db.Users.listenOne(setUser, user.id), [])

  const [userSensors, setUserSensors] = useState([])
  useEffect(() => db.Sensors.listenByUser(setUserSensors, user?.id || ""), [user])

  const findAuthUser = fb.functions().httpsCallable('findAuthUser');

  const [email, setEmail] = useState("")
  useEffect(() => {
    const handleUser = async user => {
      if (user) {
        const { email } = (await findAuthUser(user.id)).data
        setEmail(email)
      }
    }
    handleUser(user)
  }, [user])

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  const uploadImage = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      base64: true
    })

    if (!image.cancelled) {

      // image's name = date & time
      const when = new Date()
      const imageName = when.toISOString()
      const imageRef = fb.storage().ref(`users/${user.id}/images/${imageName}.jpg`)

      const response = await fetch(image.uri)
      const blob = await response.blob()
      await imageRef.put(blob)
      const url = await imageRef.getDownloadURL()
      blob.close()

      // create reading using when (ISO format) also as image name in storage
      await db.Users.update({ id: user.id, name: user.name, age: user.age, phone: user.phone, role: user.role, when, url })
    }
  }

  const [profilePics, setProfilePics] = useState([])
  useEffect(() => db.Users.listenOne(setProfilePics, user.id), [])

  let currentProfile = "https://www.pinclipart.com/picdir/middle/355-3553881_stockvader-predicted-adig-user-profile-icon-png-clipart.png"
  if (profilePics.url) {
    currentProfile = profilePics.url
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground source={require("../assets/images/background.png")} style={styles.background}>

        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

          <View style={{ alignSelf: "center", backgroundColor: 'transparent' }}>
            <View style={styles.profileImage}>
              <Image source={{ uri: currentProfile }} style={styles.image} resizeMode="center"></Image>
            </View>
            <View style={styles.dm}>
              <Badge status="success" />
            </View>
            <View style={styles.add}>
              <TouchableOpacity onPress={uploadImage}>
                <Ionicons name="ios-add" size={35} color="#FFFF" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
              {
                fullUser
                &&
                fullUser.name
              }
            </Text>
            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
              {
                fullUser
                &&
                fullUser.role
              }
            </Text>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>
                {
                  fullUser
                  &&
                  fullUser.phone
                }
              </Text>
              <Text style={[styles.text, styles.subText]}>Contact</Text>
            </View>
            <View style={[styles.statsBox]}>
              <Text style={[styles.text, { fontSize: 24 }]}>
                {
                  userSensors
                  &&
                  userSensors.length
                }
              </Text>
              <Text style={[styles.text, styles.subText]}>Sensor Bukcet</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>
                {
                  user
                  &&
                  user.age
                }
              </Text>
              <Text style={[styles.text, styles.subText]}>Age</Text>
            </View>
          </View>

          <View style={{ marginTop: 32, padding: 20, marginRight: 20, backgroundColor: 'transparent' }}>
            <Text style={[styles.text, styles.subText]}>Email</Text>
            <Text style={[styles.text, styles.subText]}>{email}</Text>
            <Text style={[styles.text, styles.subText], { textAlign: "right", color: "white" }}>{dt}</Text>
          </View>
          {/* //////////////////////////BUTTONS START////////////////////////////// */}
          <View style={{
            backgroundColor: 'transparent',
            flexDirection: "row",
            marginTop: 30
          }}
          >
            <Button
              title="Find Sensors"
              type="outline"
              buttonStyle={styles.myButton}
              onPress={() => navigation.navigate('Search')}
            />
            <View style={styles.space} />
            <Button
              title="FAQs"
              type="outline"
              buttonStyle={styles.myButton}
              onPress={() => navigation.navigate('Faq')}
            />
          </View>
          {/* ///////////////////////////////////////////////////////////////////////////////////// */}

          <View style={{
            backgroundColor: 'transparent',
            flexDirection: "row",
            marginTop: 30

          }}
          >
            <Button
              title="Payment History"
              type="outline"
              color='red'
              buttonStyle={styles.myButton}
              onPress={() => navigation.navigate('PaymentHistory')}
            />
            <View style={styles.space} />
            <Button
              title="My List"
              type="outline"
              buttonStyle={styles.myButton}
              onPress={() => navigation.navigate('List')}
            >
              <Text style={styles.CHSButtonText}>My List</Text>
            </Button>
          </View>

        </ScrollView>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  scroll: {
    marginTop: 70
  },
  background: {
    // width: '100%',
    // height: '100%',
    // width: null,
    // height: null,
    flex: 1,

    // resizeMode: 'cover', // or 'stretch'
  },
  CHSButtonText: {
    color: 'red'
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#12232E",
  },
  text: {
    color: "#EEFBFB",
    backgroundColor: 'transparent'
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    backgroundColor: "#12232E"
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    backgroundColor: "#12232E",
  },
  subText: {
    fontSize: 12,
    color: "#EEFBFB",
    textTransform: "uppercase",
    fontWeight: "500",
    backgroundColor: 'transparent'
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: "#FFFFFF"
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10
  },
  space: {
    width: 0, // or whatever size you need
    height: 5,
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignSelf: "center",
    backgroundColor: 'transparent',
    marginTop: 16
  },
  dm: {
    backgroundColor: "#55C21B",
    position: "absolute",
    top: 20,
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
    backgroundColor: 'transparent'
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
    backgroundColor: 'transparent'
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
    backgroundColor: "#12232E"
  },
  mediaCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16
  },
  myButton: {
    marginLeft: "10%",
    width: 155,
    marginBottom: "3%",
    borderColor: 'grey',
  },
});
