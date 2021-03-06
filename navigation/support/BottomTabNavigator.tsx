import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Icon } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { TouchableOpacity, Text } from "react-native";
// @ts-expect-error
import styles from '../../DeveloperMahmoud/SmartStyle';
import useColorScheme from '../../hooks/useColorScheme';
// @ts-expect-error
import SupportHomeScreen from '../../DeveloperAisha/SupportHomeScreen';
// @ts-expect-error
import SuggestionForSupport from '../../DeveloperAisha/SuggestionForSupport';
// @ts-expect-error
import SettingsScreen from '../../DeveloperHanan/SettingsScreen';
// @ts-expect-error
import Faq from '../../DeveloperHanan/Faq';
// @ts-expect-error
import SensorRequest from '../../DeveloperHanan/SensorRequest';
// @ts-expect-error
import Reports from '../../DeveloperAahmad/Reports';
// @ts-expect-error
import Promotions from '../../DeveloperMahmoud/Promotion';
// @ts-expect-error
import UserPromReq from '../../DeveloperMahmoud/UserPromReq';
// @ts-expect-error
import Maintenance from '../../DeveloperAahmad/Maintenance';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList, TabFourParamList } from './types';

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
          tabBarIcon: ({ color }) => <Icon name="home" color="white" size={25} />,
        }}
      />

      <BottomTab.Screen
        name="Reports"
        component={TabTwoNavigator}
        options={{
          // @ts-expect-error
          tabBarIcon: ({ color }) => <Icon name="report" color="white" size={25} />,
        }}
      />
      <BottomTab.Screen
        name="Faq"
        component={TabThreeNavigator}
        options={{
          // @ts-expect-error
          tabBarIcon: ({ color }) => <Icon name="question" color="white" size={25} />,
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
        component={SupportHomeScreen}
        options={{ headerTitle: 'Home' }}
      />
      <TabOneStack.Screen
        name="SuggestionForSupport"
        component={SuggestionForSupport}
        options={{ headerTitle: 'SuggestionForSupport' }}
      />
      <TabOneStack.Screen
        name="SensorRequest"
        component={SensorRequest}
        options={{ headerTitle: 'Sensor Request' }}
      />
      <TabOneStack.Screen
        name="Promotions"
        component={Promotions}
        options={({ navigation }) => ({
          headerTitle: 'Promotions',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('UserPromReq')}
            >
              {
                <Text style={styles.AddPromoButton}>Process User Request</Text>
              }
            </TouchableOpacity>
          )
        })
        }
      />
      <TabOneStack.Screen
        name="Maintenance"
        component={Maintenance}
        options={{ headerTitle: 'Maintenance' }}
      />
      <TabOneStack.Screen
        name="UserPromReq"
        component={UserPromReq}
        options={{ headerTitle: 'Redeemed Requests' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="Reports"
        component={Reports}
        options={{ headerTitle: 'Reports' }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="Faq"
        component={Faq}
        options={{ headerTitle: 'Faq' }}
      />
    </TabThreeStack.Navigator>
  );
}

const TabFourtack = createStackNavigator<TabFourParamList>();

function TabFourNavigator() {
  return (
    <TabFourtack.Navigator>
      <TabFourtack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerTitle: 'Settings' }}
      />
    </TabFourtack.Navigator>
  );
}