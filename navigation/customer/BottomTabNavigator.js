import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Icon } from "react-native-elements";
import { TouchableOpacity, Text } from "react-native";
import { Button } from "react-native-elements";
import { useState, useEffect, useContext } from "react";
import NotificationHeader from '../../DeveloperMahmoud/NotificationHeader'
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

// @ts-expect-error
import db from "../../db";
// @ts-expect-error
import CustomerHomeScreen from '../../DeveloperAisha/CustomerHomeScreen';
// @ts-expect-error
import SuggestionList from '../../DeveloperAisha/SuggestionList';
// @ts-expect-error
import Precautions from '../../DeveloperAisha/Precautions';
// @ts-expect-error
import AllUserTrashCans from '../../DeveloperAisha/AllUserTrashCans';
// @ts-expect-error
import SensorsScreen from '../../screens/Customer/SensorsScreen';
// @ts-expect-error
import SettingsScreen from '../../DeveloperHanan/SettingsScreen';
// @ts-expect-error
import Faq from '../../DeveloperHanan/Faq';
// @ts-expect-error
import Shop from '../../DeveloperHanan/Shop';
// @ts-expect-error
import Promotion from '../../DeveloperMahmoud/Promotion';
// @ts-expect-error
import Notifications from '../../DeveloperMahmoud/Notifications';
// @ts-expect-error
import PaymentHistory from '../../DeveloperHanan/PaymentHistory';
// @ts-expect-error
import Reviews from '../../DeveloperAahmad/Reviews';
// @ts-expect-error
import SearchSensors from '../../DeveloperAisha/SearchSensors';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList, TabFourParamList } from './types';


const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        style: {
          backgroundColor: 'transparent'
        }
      }
      }
    >
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          // @ts-expect-error
          tabBarIcon: ({ color }) => <Icon name="home" color="white" size={25} />,
        }}
      />
      <BottomTab.Screen
        name="Sensors"
        component={TabTwoNavigator}
        options={{
          // @ts-expect-error
          tabBarIcon: ({ color }) => <Icon name="monitor" color="white" size={25} />,
        }}
      />
      <BottomTab.Screen
        name="Shop"
        component={TabThreeNavigator}
        options={{
          // @ts-expect-error
          tabBarIcon: ({ color }) => <Icon name="shopping-cart" color="white" size={25} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={TabFourNavigator}
        options={{
          // @ts-expect-error
          tabBarIcon: ({ color }) => <Icon name="settings" color="white" size={25} />,
        }}
      />
    </BottomTab.Navigator >
  );
}
// https://icons.expo.fyi/
// function TabBarIcon(props: { name: string; color: string }) {
//   // @ts-expect-error
//   return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
// }
// interface Notification {
//   isRead: boolean;
//   message: string;
//   userId: string;
//   date: Date;
// }

// export const checkNotification = () => {
//   const { user } = useContext(UserContext);
//   const [unreadNotifications, setUnreadNotifs] = useState([]);
//   // setUnreadNotifs(
//   //   {
//   //     userId: user.id,
//   //     message: 'Capacitive Pressure sensor request has been processed',
//   //     date: new Date(),
//   //     isRead: false
//   //   }
//   // );
//   // console.log("unreadNotifications", unreadNotifications);
//   return true;
// }

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator();


function TabOneNavigator() {
  
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="Home"
        component={CustomerHomeScreen}
        options={({ navigation }) => ({
          headerTransparent: true,
          headerTitle: 'Home', headerTitleStyle: { alignSelf: 'center', marginLeft: 55 },
          headerRight: () => (
            <NotificationHeader nav={navigation}/>
          )
        }
        )
        }
      />
      <TabOneStack.Screen
        name="Faq"
        component={Faq}
        options={{ headerTitle: 'Faq' }}
      />
      <TabOneStack.Screen
        name="Search"
        component={SearchSensors}
        options={{ headerTitle: 'Search' }}
      />
      <TabOneStack.Screen
        name="List"
        component={SuggestionList}
        options={{ headerTitle: 'List' }}
      />
      <TabOneStack.Screen
        name="PaymentHistory"
        component={PaymentHistory}
        options={{ headerTitle: 'Payment History' }}
      />
     
      <TabOneStack.Screen
        name="AllUserTrashCans"
        component={AllUserTrashCans}
        options={{ headerTitle: 'AllUserTrashCans' }}
      />
      <TabOneStack.Screen
        name="Notifications"
        component={Notifications}
        options={{ headerTitle: 'Notifications' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="Sensors"
        component={SensorsScreen}
        options={({ navigation }) => ({
          headerTransparent: true,
          headerTitle: 'Control Sensors',
          headerTitleStyle: {
            alignSelf: 'center',
            marginLeft: 55
          },
          headerRight: () => (
            <NotificationHeader nav={navigation} />
          )
        }
        )
        }
      />
      <TabOneStack.Screen
        name="Precautions"
        component={Precautions}
        options={{ headerTitle: 'Precautions' }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="Shop"
        component={Shop}
        options={({ navigation }) => ({
          headerTransparent: true,
          headerTitle: 'Shop', headerTitleStyle: { alignSelf: 'center', marginLeft: 55 },
          headerRight: () => (
            <NotificationHeader nav={navigation} />
          )
        }
        )
        }
      />
      <TabThreeStack.Screen
        name="Reviews"
        component={Reviews}
        options={{ headerTitle: 'Reviews' }}
      />
      <TabThreeStack.Screen
        name="Promotion"
        component={Promotion}
        options={{ headerTitle: 'Promotion' }}
      />
    </TabThreeStack.Navigator>
  );
}


const TabFourStack = createStackNavigator();

function TabFourNavigator() {
  return (
    <TabFourStack.Navigator>
      <TabFourStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={({ navigation }) => ({
          headerTransparent: true,
          headerTitle: 'Settings', headerTitleStyle: { alignSelf: 'center', marginLeft: 55 },
          headerRight: () => (
            <NotificationHeader nav={navigation} />
          )
        }
        )
        }
      />
    </TabFourStack.Navigator>
  );
}