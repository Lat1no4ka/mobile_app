import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Detail from "./components/detail";
import SearchProduct from './components/searchProduct';

const Stack = createStackNavigator();

const CompareScreen = () => {

    return (
        <Stack.Navigator initialRouteName="Поиск">
            <Stack.Screen name="Поиск" component={SearchProduct} />
            <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
    );
};


export default CompareScreen;