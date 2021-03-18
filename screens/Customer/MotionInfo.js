import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { Text, View } from '../../components/Themed';
import db from '../../db'
import { Avatar } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context';

// all picker values should be non-object (number, string, etc.)

export default function MotionInfo({ user, category, sensor }) {

    const [readings, setReadings] = useState([])
    // can only load images once you know the sensor id
    // -- first time running, will stop because sensor.id is ""
    // -- when sensor is loaded (above), will rerun
    // -- second time running will active the listener to images
    useEffect(() => sensor ? db.Sensors.Readings.listen2OrderByWhen(setReadings, sensor.id) : undefined, [sensor])

    let latestImageURL = "https://gifimage.net/wp-content/uploads/2018/04/preloader-gif-transparent-background-3.gif"
    if (readings.length >= 1) {
        latestImageURL = readings[0].url
    }

    let previousImageURL = "https://gifimage.net/wp-content/uploads/2018/04/preloader-gif-transparent-background-3.gif"
    if (readings.length >= 2) {
        previousImageURL = readings[1].url
    }

    console.log(category)
    console.log(readings.length)

    return (
        <SafeAreaProvider style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
      
        <View style= {{ backgroundColor:"#4DA8DA", height:50,margin:30}}>
        <Text style= {{color: 'black',textAlign:"center",marginTop:10, fontSize:20 , fontWeight:"bold", fontStyle:"italic"}}>Previous Motion</Text>
        </View>

        <View style= {{ backgroundColor:"#12232E", alignSelf:"center",marginHorizontal:30}}>
            <Image
                style={styles.tinyLogo}
                source={{
                    uri: previousImageURL,
                }}
            />
            </View>
          
        <View style= {{ backgroundColor:"#4DA8DA", height:50,margin:30}}>
            <Text style= {{color: 'black',textAlign:"center",marginTop:10, fontSize:20 , fontWeight:"bold", fontStyle:"italic"}}>Current Motion</Text>
        </View>

        <View style= {{ backgroundColor:"#12232E", alignSelf:"center",marginHorizontal:30}}>
            <Image
                style={styles.tinyLogo}
                source={{
                    uri: latestImageURL,
                }}
            />
            </View>

        <View style= {{ backgroundColor:"#4DA8DA", height:50,margin:10, marginRight:30,marginLeft:30}}>
        <Text style= {{color: 'black',textAlign:"center",marginTop:10, fontSize:20 , fontWeight:"bold", fontStyle:"italic"}}>Motion Detected</Text>
        </View>

        <View style= {{ backgroundColor:"grey", alignSelf:"center", height:150}}>
        <Avatar
            size="xlarge"
            rounded
            icon={{name: 'camera', type: 'fontisto'}}
            activeOpacity={0.7}
            containerStyle={{flex: 5}}
            />
        <Text style={{textAlign:"center", fontSize:20, color:"black",fontWeight:"bold", fontStyle:'italic'}}> {sensor.motiondetected ? "True" : "False"}</Text>
        </View>
        </ScrollView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 150,
        height: 150,
    },
    container: {
        flex: 1,
        backgroundColor: '#12232E',
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
});