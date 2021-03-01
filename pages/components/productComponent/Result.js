import React, { useState, useEffect } from 'react';
import * as calculation from "../../../services/calculation/Calcualtion";
import Calcualtions from "./Calculations";
import ChartsWrapper from "./ChartsWrapper";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const Result = ({ route, navigation }) => {
    const product = route.params.data;
    const [leftSelected, setLeftSelected] = useState(null);
    const [rightSelected, setRightSelected] = useState(null);

    if (product.length > 1) {
        return (
            <>
                <Tab.Navigator>
                    <Tab.Screen name="Расчет" component={() => <Calcualtions
                        params={route.params}
                        setLeftSelected={setLeftSelected}
                        setRightSelected={setRightSelected}
                        leftSelected={leftSelected}
                        rightSelected={rightSelected}
                    />} />
                    <Tab.Screen name="График" component={() => <ChartsWrapper
                        params={route.params}
                        leftSelected={leftSelected}
                        rightSelected={rightSelected}
                    />} />
                </Tab.Navigator>
            </>
        )
    } else {
        return (
            <>
                <Tab.Navigator>
                    <Tab.Screen name="Расчет" component={() => <Calcualtions params={route.params} />} />
                    <Tab.Screen name="График" component={() => <ChartsWrapper params={route.params} />} />
                </Tab.Navigator>
            </>
        )
    }
}

export default Result;