import React, { useState, useEffect } from 'react';
import { StyleSheet } from "react-native";
import { IconButton } from 'react-native-paper';
import ModalWindow from "./ModalWindow";
import Calcualtions from "./Calculations";
import ChartsWrapper from "./ChartsWrapper";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const Result = ({ route, navigation }) => {
    const [visible, setVisible] = useState(false);
    const product = route.params.data;
    const [leftSelected, setLeftSelected] = useState(null);
    const [rightSelected, setRightSelected] = useState(null);
    const [nutrientSelected, setNutrientSelected] = useState(null);
    const [screen, setScreen] = useState("calc");
    const [resCalc, setResCalc] = useState({ "name": "Содержание от суточной потребности в 100г, %", "key": "qb" });

    route.params.checkedItem = route.params.checkedItem.filter((check) => {
        return check != null ? check : null;
    })

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton
                    icon="reorder-three"
                    size={35}
                    onPress={() => setVisible(!visible)}
                />
            ),
        });
    }, [navigation]);


    const calculationComponentForOne = () => {
        return (<Calcualtions
            product={product}
            nutrientSelected={nutrientSelected ?? route.params.checkedItem[0]}
            resCalc={resCalc} />
        )
    }

    const calculationComponentForTwo = () => {
        return (<Calcualtions
            product={product}
            setLeftSelected={setLeftSelected}
            setRightSelected={setRightSelected}
            setNutrientSelected={setNutrientSelected}
            leftSelected={leftSelected ?? product[0]}
            rightSelected={rightSelected ?? product[1]}
            nutrientSelected={nutrientSelected ?? route.params.checkedItem[0]}
        />)
    }

    const ChartsWrapperComponentForOne = () => {
        return (<ChartsWrapper
            product={product}
            nutrientSelected={nutrientSelected ?? route.params.checkedItem[0]}
            resCalc={resCalc}
        />)
    }

    const ChartsWrapperComponentForTwo = () => {
        return (<ChartsWrapper
            product={product}
            setLeftSelected={setLeftSelected}
            setRightSelected={setRightSelected}
            setNutrientSelected={setNutrientSelected}
            leftSelected={leftSelected ?? product[0]}
            rightSelected={rightSelected ?? product[1]}
            nutrientSelected={nutrientSelected ?? route.params.checkedItem[0]}
            resCalc={resCalc}
        />)
    }

    if (product.length > 1) {
        return (
            <>
                <ModalWindow
                    setV={setVisible}
                    visible={visible}
                    style={styles.modalWindow}
                    params={route.params}
                    setLeftSelected={setLeftSelected}
                    setRightSelected={setRightSelected}
                    setNutrientSelected={setNutrientSelected}
                    setResCalc={setResCalc}
                    leftSelected={leftSelected ?? product[0]}
                    rightSelected={rightSelected ?? product[1]}
                    nutrientSelected={nutrientSelected ?? route.params.checkedItem[0]}
                    screen={screen}
                />

                <Tab.Navigator>
                    <Tab.Screen name="Расчет"
                        listeners={{
                            tabPress: e => {
                                setScreen("calc")
                            },
                            swipeEnd: e => {
                                setScreen("calc")
                            },

                        }}
                        component={calculationComponentForTwo} />
                    <Tab.Screen name="График"
                        listeners={{
                            tabPress: e => {
                                setScreen("charts")
                            },
                            swipeEnd: e => {
                                setScreen("charts")
                            },
                        }}
                        component={ChartsWrapperComponentForTwo} />
                </Tab.Navigator>
            </>
        )
    } else {
        return (
            <>
                <ModalWindow
                    setV={setVisible}
                    visible={visible}
                    style={styles.modalWindow}
                    params={route.params}
                    setLeftSelected={setLeftSelected}
                    setRightSelected={setRightSelected}
                    setNutrientSelected={setNutrientSelected}
                    setResCalc={setResCalc}
                    leftSelected={leftSelected ?? product[0]}
                    rightSelected={rightSelected ?? product[1]}
                    nutrientSelected={nutrientSelected ?? route.params.checkedItem[0]}
                    screen={screen}
                />
                <Tab.Navigator>
                    <Tab.Screen name="Расчет"
                        listeners={{
                            swipeEnd: e => {
                                setScreen("calc")
                            },
                            tabPress: e => {
                                setScreen("calc")
                            },
                        }}
                        component={calculationComponentForOne} />
                    {<Tab.Screen name="График"
                        listeners={{
                            swipeEnd: e => {
                                setScreen("charts")
                            },
                            tabPress: e => {
                                setScreen("charts")
                            },
                        }}
                        component={ChartsWrapperComponentForOne} />}
                </Tab.Navigator>
            </>
        )
    }
}

const styles = StyleSheet.create({
    modalWindow: {
        position: 'absolute',
        left: 0,
        bottom: 0,
    }
});

export default Result;
