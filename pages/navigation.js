
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ProducScreen from './product';
import CompareScreen from './compare';
import HistoryScreen from './history';
import SettingScreen from './setting';

const Tab = createBottomTabNavigator();

const Navigation = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Product') {
              iconName = focused
                ? 'fast-food'
                : 'fast-food-outline';
            } else if (route.name === 'Compare') {
              iconName = focused ?
                'stats-chart'
                : 'stats-chart-outline';
            } else if (route.name === 'Hisroty') {
              iconName = focused ?
                'time'
                : 'time-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ?
                'settings'
                : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'black',
          showLabel: false,
          keyboardHidesTabBar: true
        }}
      >
        <Tab.Screen name="Product" component={ProducScreen} />
        <Tab.Screen name="Compare" component={CompareScreen} />
        <Tab.Screen name="Hisroty" component={HistoryScreen} />
        <Tab.Screen name="Settings" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};



export default Navigation;