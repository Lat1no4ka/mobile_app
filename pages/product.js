import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Composition from "./components/productComponent/Composition";
import SearchProduct from './components/productComponent/SearchProduct';
import Result from "./components/productComponent/Result";
import SelectProduct from "./components/productComponent/SelectProduct";

const Stack = createStackNavigator();

const CompareScreen = () => {

    return (
        <Stack.Navigator initialRouteName="Продукты">
            <Stack.Screen name="Продукты" component={SelectProduct} />
            <Stack.Screen name="Поиск" component={SearchProduct} />
            <Stack.Screen name="Нутриенты" component={Composition} />
            <Stack.Screen name="Расчет" component={Result} />
        </Stack.Navigator>
    );
};



export default CompareScreen;
