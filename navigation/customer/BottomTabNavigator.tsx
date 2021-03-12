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
// @ts-expect-error
import SearchSensors from '../../DeveloperAisha/SearchSensors';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList, TabFourParamList} from './types';


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
          tabBarIcon: ({ color }) => <Icon name="home" color="black"size={25} />,
        }}
      />
            <BottomTab.Screen
        name="Sensors"
        component={TabTwoNavigator}
        options={{
           // @ts-expect-error
           tabBarIcon: ({ color }) => <Icon name="monitor" color="black"size={25} />,
        }}
      />
        <BottomTab.Screen
        name="Shop"
        component={TabThreeNavigator}
        options={{
          // @ts-expect-error
          tabBarIcon: ({ color }) => <Icon name="shop" color="black"size={25} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={TabFourNavigator}
        options={{
          // @ts-expect-error
          tabBarIcon: ({ color }) => <Icon name="settings" color="black"size={25} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
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
        name="Faq"
        component={Faq}
        options={{ headerTitle: 'Faq' }}
      />
      <TabOneStack.Screen
        name="Reviews"
        component={Faq}
        options={{ headerTitle: 'Reviews' }}
      />
      <TabOneStack.Screen
        name="Search"
        component={SearchSensors}
        options={{ headerTitle: 'Search' }}
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

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="Shop"
        component={Shop}
        options={{ headerTitle: 'Shop' }}
      />
    </TabThreeStack.Navigator>
  );
}


const TabFourStack = createStackNavigator<TabFourParamList>();

function TabFourNavigator() {
  return (
    <TabFourStack.Navigator>
      <TabFourStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerTitle: 'Settings' }}
      />
    </TabFourStack.Navigator>
  );
}