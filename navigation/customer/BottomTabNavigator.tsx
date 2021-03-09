import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Icon } from 'react-native-elements'

import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

// @ts-expect-error
import CustomerHomeScreen from '../../DeveloperAisha/CustomerHomeScreen';
// @ts-expect-error
import SensorsScreen from '../../screens/Customer/SensorsScreen';
// @ts-expect-error
import SettingsScreen from '../../DeveloperHanan/SettingsScreen';
// @ts-expect-error
import Faq from '../../DeveloperHanan/Faq';
// @ts-expect-error
import Shop from '../../DeveloperHanan/Shop';
import { Icon } from 'react-native-elements'
import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList, TabFourParamList,TabFiveParamList } from './types';
import SearchSensors from '../../DeveloperAisha/SearchSensors';


const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          // @ts-expect-error
          tabBarIcon: ({ color }) => <Icon name="home" color="black"size={30} />,
        }}
      />
            <BottomTab.Screen
        name="Sensors"
        component={TabTwoNavigator}
        options={{
           // @ts-expect-error
           tabBarIcon: ({ color }) => <Icon name="monitor" color="black"size={30} />,
        }}
      />
        <BottomTab.Screen
        name="Faq"
        component={TabFourNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />

        <BottomTab.Screen
        name="Shop"
        component={TabFiveNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />

      
      <BottomTab.Screen
        name="Search"
        component={TabThreeNavigator}
        options={{
          // @ts-expect-error
          tabBarIcon: ({ color }) => <Icon name="search" color="black"size={30} />,
        }}
      />
      {/* <BottomTab.Screen
        name="Settings"
        component={TabFourNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      /> */}
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  // @ts-expect-error
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="Home"
        component={CustomerHomeScreen}
        options={{ headerTitle: 'Home' }}
      />
      <TabOneStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerTitle: 'Settings' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="Sensors"
        component={SensorsScreen}
        options={{ headerTitle: 'Sensors' }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabFourtack = createStackNavigator<TabFourParamList>();

function TabFourNavigator() {
  return (
    <TabFourtack.Navigator>
      <TabFourtack.Screen
        name="Faq"
        component={Faq}
        options={{ headerTitle: 'Faqs' }}
      />
    </TabFourtack.Navigator>
  );
}

const TabFiveStack = createStackNavigator<TabFiveParamList>();

function TabFiveNavigator() {
  return (
    <TabFiveStack.Navigator>
      <TabFiveStack.Screen
        name="Shop"
        component={Shop}
        options={{ headerTitle: 'Shops' }}
      />
    </TabFiveStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="Search"
        component={SearchSensors}
        options={{ headerTitle: 'Search' }}
      />
    </TabThreeStack.Navigator>
  );
}

// const TabFourStack = createStackNavigator<TabFourParamList>();

// function TabFourNavigator() {
//   return (
//     <TabFourStack.Navigator>
//       <TabFourStack.Screen
//         name="SettingsScreen"
//         component={SettingsScreen}
//         options={{ headerTitle: 'Settings' }}
//       />
//     </TabFourStack.Navigator>
//   );
// }