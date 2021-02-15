import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Composition from "./components/composition";
import SearchProduct from './components/searchProduct';
import Calculations from "./components/calculations";

const Stack = createStackNavigator();

const CompareScreen = () => {

    return (
        <Stack.Navigator initialRouteName="Поиск">
            <Stack.Screen name="Поиск" component={SearchProduct} />
            <Stack.Screen name="Нутриенты" component={Composition} />
            <Stack.Screen name="Расчет" component={Calculations} />
        </Stack.Navigator>
    );
};


export default CompareScreen;