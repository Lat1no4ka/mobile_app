import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Pressable, Button } from "react-native";
import Dropdown from "./Dropdown";
import DropdownCharts from "./DropdownCharts";

const ModalWindow = (props) => {

    const [leftSelected, setLeftSelected] = useState(props.leftSelected);
    const [rightSelected, setRightSelected] = useState(props.rightSelected);
    const [nutrientSelected, setNutrientSelected] = useState(props.nutrientSelected);
    const [resCalc, setResCalc] = useState({ "name": "Содержание от суточной потребности в 100г, %", "key": "qb" });
    const closeModal = () => {
        props.setLeftSelected(leftSelected);
        props.setRightSelected(rightSelected);
        props.setNutrientSelected(nutrientSelected);
        props.setV(false);
        props.setResCalc(resCalc)
    }
    if (props.screen == "calc") {
        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    presentationStyle={"overFullScreen"}
                    visible={props.visible}
                    onRequestClose={() => {
                        props.setV(!props.visible);
                    }}
                >
                    <TouchableOpacity
                        style={styles.centeredView}
                        activeOpacity={1}
                        onPressOut={() => closeModal()}
                    >
                            <TouchableWithoutFeedback>
                                <View style={styles.modalView}>
                                    <Dropdown
                                        product={props.params.data}
                                        checkedItem={props.params.checkedItem}
                                        leftSelected={leftSelected}
                                        rightSelected={rightSelected}
                                        nutrientSelected={nutrientSelected}
                                        resCalc={resCalc}
                                        setRightSelected={setRightSelected}
                                        setLeftSelected={setLeftSelected}
                                        setNutrientSelected={setNutrientSelected}
                                    />
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => closeModal()}
                                    >
                                        <Text style={styles.textStyle}>Рассчет</Text>
                                    </Pressable>
                                </View>
                            </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    } else {
        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    presentationStyle={"overFullScreen"}
                    visible={props.visible}
                    onRequestClose={() => {
                        props.setV(!props.visible);
                    }}
                >
                    <TouchableOpacity
                        style={styles.centeredView}
                        activeOpacity={1}
                        onPressOut={() => { closeModal() }}
                    >
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
                                <DropdownCharts
                                    product={props.params.data}
                                    checkedItem={props.params.checkedItem}
                                    leftSelected={leftSelected}
                                    rightSelected={rightSelected}
                                    nutrientSelected={nutrientSelected}
                                    resCalc={resCalc}
                                    setRightSelected={setRightSelected}
                                    setLeftSelected={setLeftSelected}
                                    setNutrientSelected={setNutrientSelected}
                                    setResCalc={setResCalc}
                                />
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => closeModal()}
                                >
                                    <Text style={styles.textStyle}>Рассчет</Text>
                                </Pressable>
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        position: "absolute",
        height: "100%",
        width: "100%",
    },
    modalView: {
        position: "absolute",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "100%",
        bottom: 0
    },
    button: {
        padding: 10,
        backgroundColor:"blue",
        width:200,
        borderRadius: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default ModalWindow;