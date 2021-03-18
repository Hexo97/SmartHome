import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView , Image } from "react-native";
import { View ,Text} from '../components/Themed';
import db from '../db'
import { Avatar } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

// all picker values should be non-object (number, string, etc.)

export default function ProximityInfo({ user, category, sensor }) {

    const [proximityData, setProximityData] = useState([])
    useEffect(() => sensor ? db.Sensors.Readings.listenLatestOne(setProximityData, sensor.id) : undefined, [sensor])

    return (
        <SafeAreaProvider style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>

        <View style= {{ backgroundColor:"#12232E", alignSelf:"center",marginHorizontal:30}}>
            <Button
                    title="Show All TrashCans"
                    type="outline"
                    onPress={() => navigation.navigate('AllUserTrashCans')}
                    icon={
                        <Icon
                        name="eye"
                        size={30}
                        color="lightblue"
                        style={{marginRight:10}}
                        />
                    }
            />
        </View>

        <View style={{flexDirection:"row" , backgroundColor:"#12232E", marginBottom:10, marginTop:10}}>
        <View style= {{ backgroundColor:"#BCE937", alignSelf:"center", height:150,marginHorizontal:40}}>
        <Avatar
            size="xlarge"
            rounded
            icon={{name: 'map-marker-alt', type: 'fontisto'}}
            activeOpacity={0.7}
            containerStyle={{flex: 5}}
            />
        <Text style={{textAlign:"center", fontSize:20, color:"black", fontWeight:"bold", fontStyle:'italic'}}>{sensor?.location}</Text>
        </View>

        <View style= {{ backgroundColor:"#9CE7F9", alignSelf:"center", height:150}}>
        <Avatar
            size="xlarge"
            rounded
            icon={{name: 'universal-acces', type: 'fontisto'}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
            containerStyle={{flex: 5}}
            />
             <Text style={sensor.presenceDetected ? styles.getStartedGreen : styles.getStartedRed}> {sensor.presenceDetected ? "True" : "False"}</Text>
        </View>
        </View>

        <View style={{flexDirection:"row" , backgroundColor:"#12232E", marginBottom:10}}>
        <View style= {{ backgroundColor:"#E599E2", alignSelf:"center", height:150,marginHorizontal:40}}>
        <Avatar
            size="xlarge"
            rounded
            icon={{name: 'world-o', type: 'fontisto'}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
            containerStyle={{flex: 5}}
            />
             <Text style={{textAlign:"center", fontSize:20, color:"black",fontWeight:"bold", fontStyle:'italic'}}>{sensor?.latitude}</Text>
        </View>

        <View style= {{ backgroundColor:"#758080", alignSelf:"center", height:150}}>
        <Avatar
            size="xlarge"
            rounded
            icon={{name: 'world-o', type: 'fontisto'}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
            containerStyle={{flex: 5}}
            />
        <Text style={{textAlign:"center", fontSize:20, color:"black",fontWeight:"bold", fontStyle:'italic'}}>{sensor?.longitude}</Text>
        </View>
        </View>

        <View style={{flexDirection:"row" , backgroundColor:"#12232E", marginBottom:10}}>
        <View style= {{ backgroundColor:"#f6cd61", alignSelf:"center", height:150,marginHorizontal:40}}>
        <Avatar
            size="xlarge"
            rounded
            icon={{name: 'close', type: 'fontisto'}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
            containerStyle={{flex: 5}}
            />
        <Text style={sensor.presenceDetected ? styles.getStartedGreen : styles.getStartedRed}>{sensor?.state}</Text>
        </View>

        <View style= {{ backgroundColor:"#e24437", alignSelf:"center", height:150}}>
        <Avatar
            size="xlarge"
            rounded
            icon={{name: 'trash', type: 'fontisto'}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
            containerStyle={{flex: 5}}
            />
        <Text style={{textAlign:"center", fontSize:20, color:"black",fontWeight:"bold", fontStyle:'italic'}}>{sensor?.fill}</Text>
        </View>
        </View>

        <View style={styles.space} />
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
        fontWeight:"bold"
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
    space: {
        width: 0, // or whatever size you need
        height: 5,
      },
          getStartedGreen: {
        fontSize: 20,
        lineHeight: 24,
        textAlign: 'center',
        color: 'green',
        fontWeight:"bold"
    },
    getStartedRed: {
        fontSize: 20,
        lineHeight: 24,
        textAlign: 'center',
        color: 'red',
        fontWeight:"bold"
    },
});