import React, { useState, useEffect } from 'react';
import * as calculation from "../../../services/calculation/Calcualtion";
import { Table, Row, Rows } from 'react-native-table-component';
import { ActivityIndicator } from "react-native";
import { StyleSheet, Dimensions, View, Text, ScrollView, Alert, Modal, Pressable } from 'react-native';
import { IconButton } from 'react-native-paper';


const Calculations = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState("");
    useEffect(() => {
    }, []);



    const calcOneItem = (params) => {
        let result = {};
        let data = calculation.dataFromDB(params.item);
        if (data) {
            let qb = calculation.qb(data.dayliRate, data.product, params.nutrient);
            let pqb = calculation.pqb(qb, params.item);
            let ccu = calculation.ccu(pqb, params.item);
            let ucc = calculation.ucc(pqb, params.item);
            let sp = calculation.sp(pqb)
            let scp = calculation.scp(sp, params.item)
            result = {
                "nutrient_name": params.nutrient.name,
                "qb": qb,
                "pqb": pqb,
                "ccu": ccu,
                "ucc": ucc,
                "sp": sp,
                "scp": scp,
            }
            if (result) {
                return result;
            }
        }


    }

    const resColor = (res1, res2) => {
        if (Number(res1) == Number(res2)) {
            return ("");
        } else if (Number(res1) < Number(res2)) {
            return (styles.resColor)
        } else {
            return ("");
        }
    }
    const resColorOther = (res1, res2) => {
        if (Number(res1) == Number(res2)) {
            return ("");
        } else if (Number(res2) < Number(res1)) {
            return (styles.resColor)
        } else {
            return ("");
        }
    }

    const CustomModal = () => {
        let Messages = () => {
            return (
                <>
                </>
            )
        }
        if (message == 'qb') {
            Messages = () => {
                if (props.product.length > 1) {
                    return (
                        <>

                            <Text style={{fontSize:17}}>
                                <Text style={{ fontWeight: "bold" }}>Содержание нутриента в{"\u00A0"}100{"\u00A0"}г. продукции,{"\u00A0"} от суточной потребности нутриента{"\u00A0"}- </Text>
                                На сколько процентов возможно удовлетворить суточную потребность в выбранном пищевом веществе (нутриенте), если употребить <Text style={{ fontWeight: "bold" }}>100{"\u00A0"}грамм</Text> продукции.
                            </Text>
                            <Text style={{fontSize:17}}>{"\n"}Чем выше значение, тем больше пользы принесёт продукт.</Text>
                        </>
                    )
                } else {
                    return (
                        <>

                            <Text style={{fontSize:17}}>
                                <Text style={{ fontWeight: "bold" }}>Содержание нутриента в 100{"\u00A0"}г продукции,{"\u00A0"} от суточной потребности нутриента{"\u00A0"}- </Text>
                                 На сколько процентов возможно удовлетворить суточную потребность в выбранном пищевом веществе (нутриенте), если употребить <Text style={{ fontWeight: "bold" }}>100{"\u00A0"}грамм</Text> продукции.
                            </Text>
                        </>
                    )
                }
            }
        } else if (message == 'pqb') {
            Messages = () => {
                if (props.product.length > 1) {
                    return (
                        <>
                            <Text style={{fontSize:17}}>
                                <Text style={{ fontWeight: "bold" }}>Содержание нутриента в указанной Вами массе продукции,{"\u00A0"}% от суточной потребности нутриента{"\u00A0"}- </Text>
                             На сколько процентов возможно удовлетворить суточную потребность в выбранном пищевом веществе (нутриенте), если употребить указанную Вами массу продукции.
                            </Text>
                            <Text style={{fontSize:17}}>{"\n"}Чем выше значение, тем больше пользы принесёт продукт.</Text>
                        </>
                    )
                } else {
                    return (
                        <>
                            <Text style={{fontSize:17}}>
                                <Text style={{ fontWeight: "bold" }}>Содержание нутриента в указанной Вами массе продукции,{"\u00A0"}% от суточной потребности нутриента{"\u00A0"}- </Text>
                                 На сколько процентов возможно удовлетворить суточную потребность в выбранном пищевом веществе (нутриенте), если употребить указанную Вами массу продукции.
                                </Text>
                        </>
                    )
                }
            }
        } else if (message == 'ccu') {
            Messages = () => {
                if (props.product.length > 1) {
                    return (
                        <>
                            <Text style={{fontSize:17}}>
                                <Text style={{ fontWeight: "bold" }}>Ценовой коэффициент полезности,{"\u00A0"}руб{"\u00A0"}/{"\u00A0"}%{"\u00A0"}- </Text>
                            Коэффициент, который показывает,<Text style={{ fontWeight: "bold" }}> сколько необходимо заплатить </Text> за то количество продукции, которое удовлетворит суточную потребность в выбранном пищевом веществе (нутриенте) на{"\u00A0"}1%.
                            </Text>
                            <Text style={{fontSize:17}}>{"\n"}Чем ниже значение, тем больше пользы принесёт продукт.</Text>
                        </>
                    )
                } else {
                    return (
                        <>
                            <Text style={{fontSize:17}}>
                                <Text style={{ fontWeight: "bold" }}>Ценовой коэффициент полезности,{"\u00A0"}руб{"\u00A0"}/{"\u00A0"}%{"\u00A0"}- </Text>
                                Коэффициент, который показывает,<Text style={{ fontWeight: "bold" }}> сколько необходимо заплатить </Text> за то количество продукции, которое удовлетворит суточную потребность в выбранном пищевом веществе (нутриенте) на{"\u00A0"}1%.
                                </Text>
                        </>
                    )
                }
            }
        } else if (message == 'ucc') {
            Messages = () => {
                if (props.product.length > 1) {
                    return (
                        <>
                            <Text style={{fontSize:17}}>
                                <Text style={{ fontWeight: "bold" }}>Обратный коэффициент,{"\u00A0"}%{"\u00A0"}/{"\u00A0"}руб{"\u00A0"}- </Text>
                            Коэффициент, который показывает,<Text style={{ fontWeight: "bold" }}> на сколько процентов возможно удовлетворить </Text>суточную потребность в выбранном пищевом веществе (нутриенте), если заплатить за продукцию{"\u00A0"}<Text style={{ fontWeight: "bold" }}>1{"\u00A0"}рубль</Text>.
                            </Text>
                            <Text style={{fontSize:17}}>{"\n"}Чем выше значение, тем больше пользы принесёт продукт.</Text>
                        </>
                    )
                } else {
                    return (
                        <>
                            <Text style={{fontSize:17}}>
                                <Text style={{ fontWeight: "bold" }}>Обратный коэффициент,{"\u00A0"}%{"\u00A0"}/{"\u00A0"}руб{"\u00A0"}- </Text>
                                Коэффициент, который показывает,<Text style={{ fontWeight: "bold" }}> на сколько процентов возможно удовлетворить </Text>суточную потребность в выбранном пищевом веществе (нутриенте), если заплатить за продукцию{"\u00A0"}<Text style={{ fontWeight: "bold" }}>1{"\u00A0"}рубль</Text>.
                                </Text>
                        </>
                    )
                }
            }
        } else if (message == 'sp') {
            Messages = () => {
                if (props.product.length > 1) {
                    return (
                        <>
                            <Text style={{fontSize:17}}>
                                <Text style={{ fontWeight: "bold" }}>Количество порций,{"\u00A0"}шт{"\u00A0"}– </Text>
                             То количество порций (указанной Вами массы продукции), которое<Text style={{ fontWeight: "bold" }}> полностью удовлетворит</Text> суточную потребность в выбранном пищевом веществе (нутриенте).
                             </Text>
                            <Text style={{fontSize:17}}>{"\n"}Чем ниже значение, тем больше пользы принесёт продукт.</Text>
                        </>
                    )
                } else {
                    return (
                        <>
                            <Text style={{fontSize:17}}>
                                <Text style={{ fontWeight: "bold" }}>Количество порций,{"\u00A0"}шт{"\u00A0"}– </Text>
                                 То количество порций (указанной Вами массы продукции), которое<Text style={{ fontWeight: "bold" }}> полностью удовлетворит</Text> суточную потребность в выбранном пищевом веществе (нутриенте).
                                 </Text>
                        </>
                    )
                }
            }
        } else if (message == 'scp') {
            Messages = () => {
                if (props.product.length > 1) {
                    return (
                        <>
                            <Text style={{fontSize:17}}>
                                <Text style={{ fontWeight: "bold" }}>Стоимость порций,{"\u00A0"}руб{"\u00A0"}– </Text>
                            Стоимость того количества порций (указанной Вами массы продукции), которое<Text style={{ fontWeight: "bold" }}> полностью удовлетворит суточную потребность</Text> в выбранном пищевом веществе (нутриенте).
                            </Text>
                            <Text style={{fontSize:17}}>{"\n"}Чем ниже значение, тем больше пользы принесёт продукт.</Text>
                        </>
                    )
                } else {
                    return (
                        <>
                            <Text style={{fontSize:17}}>
                                <Text style={{ fontWeight: "bold" }}>Стоимость порций,{"\u00A0"}руб{"\u00A0"}– </Text>
                            Стоимость того количества порций (указанной Вами массы продукции), которое<Text style={{ fontWeight: "bold" }}> полностью удовлетворит суточную потребность</Text> в выбранном пищевом веществе (нутриенте).
                            </Text>
                        </>
                    )
                }
            }
        }

        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalBackgroun}></View>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Messages />
                            <Pressable
                                style={styles.closeBtn}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={[{fontSize:17},{fontWeight:"bold"}]}>Понятно</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

    const DescButton = (props) => {
        let key = props.btn;


        return (<IconButton
            icon="help-circle-outline"
            size={25}
            color="#0000FF"
            onPress={() => { setMessage(key), setModalVisible(true) }}
        />)
    }

    const DescForTable = (props) => {
        return (
            <>
                <View style={[styles.btnInTable, styles.textInTable]}>
                    <View style={styles.text}>
                        <Text>{props.name}</Text>
                    </View>
                    <View style={styles.icon}>
                        <DescButton btn={props.btn} />
                    </View>
                </View>
            </>
        )
    }

    const CalResult = (params) => {
        if (Object.keys(params).length > 2) {
            let Litem = { "item": params.Litem, "nutrient": params.nutrient };
            let Ritem = { "item": params.Ritem, "nutrient": params.nutrient };
            let Lresult = calcOneItem(Litem);
            let Rresult = calcOneItem(Ritem);
            if (Rresult && Lresult) {
                let tableHead = [<Text style={styles.textInTable}>{params.Litem.name}</Text>, <Text style={styles.textInTable}> {Lresult.nutrient_name}</Text>, <Text style={styles.textInTable}> {params.Ritem.name}</Text>];
                let tableData = [
                    [<Text style={[styles.textInTable, resColor(Lresult.qb.toFixed(2), Rresult.qb.toFixed(2))]}>{Lresult.qb.toFixed(2)}</Text>, <DescForTable name={"Содержание нутриента от суточной потребности в 100\u00A0г."} btn={"qb"} />, <Text style={[styles.textInTable, resColor(Rresult.qb.toFixed(2), Lresult.qb.toFixed(2))]}>{Rresult.qb.toFixed(2)}</Text>],
                    [<Text style={[styles.textInTable, resColor(Lresult.pqb.toFixed(2), Rresult.pqb.toFixed(2))]}>{Lresult.pqb.toFixed(2)}</Text>, <DescForTable name={"Содержание нутриента от суточной потребности в порции"} btn={"pqb"} />, <Text style={[styles.textInTable, resColor(Rresult.pqb.toFixed(2), Lresult.pqb.toFixed(2))]}>{Rresult.pqb.toFixed(2)}</Text>],
                    [<Text style={[styles.textInTable, resColorOther(Lresult.ccu.toFixed(2), Rresult.ccu.toFixed(2))]}>{Lresult.ccu.toFixed(2)}</Text>, <DescForTable name={"Ценовой коэффициент полезности"} btn={"ccu"} />, <Text style={[styles.textInTable, resColorOther(Rresult.ccu.toFixed(2), Lresult.ccu.toFixed(2))]}>{Rresult.ccu.toFixed(2)}</Text>],
                    [<Text style={[styles.textInTable, resColor(Lresult.ucc.toFixed(2), Rresult.ucc.toFixed(2))]}>{Lresult.ucc.toFixed(2)}</Text>, <DescForTable name={"Обратный коэффициент"} btn={"ucc"} />, <Text style={[styles.textInTable, resColor(Rresult.ucc.toFixed(2), Lresult.ucc.toFixed(2))]}>{Rresult.ucc.toFixed(2)}</Text>],
                    [<Text style={[styles.textInTable, resColorOther(Lresult.sp.toFixed(2), Rresult.sp.toFixed(2))]}>{Lresult.sp.toFixed(2)}</Text>, <DescForTable name={"Кол-во порций"} btn={"sp"} />, <Text style={[styles.textInTable, resColorOther(Rresult.sp.toFixed(2), Lresult.sp.toFixed(2))]}>{Rresult.sp.toFixed(2)}</Text>],
                    [<Text style={[styles.textInTable, resColorOther(Lresult.scp.toFixed(2), Rresult.scp.toFixed(2))]}>{Lresult.scp.toFixed(2)}</Text>, <DescForTable name={"Стоимость порций"} btn={"scp"} />, <Text style={[styles.textInTable, resColorOther(Rresult.scp.toFixed(2), Lresult.scp.toFixed(2))]}>{Rresult.scp.toFixed(2)}</Text>]
                ];
                return (
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#0000ff' }}>
                        <Row data={tableHead} flexArr={[1, 3, 1]} textStyle={styles.text} />
                        <Rows data={tableData} flexArr={[1, 3, 1]} textStyle={styles.text} />
                    </Table>
                )
            } else {
                return (<ActivityIndicator size="large" color="#0000ff" />)
            }
        } else {
            let item = { "item": params.item, "nutrient": params.nutrient };
            let result = calcOneItem(item);
            if (result) {
                let tableHead = [<Text style={styles.textInTable}>{result.nutrient_name}</Text>, <Text style={styles.textInTable}> {params.item.name}</Text>];
                let tableData = [
                    [<DescForTable name={"Содержание нутриента от суточной потребности в 100\u00A0г."} btn={"qb"} />, <Text style={styles.textInTable}> {result.qb.toFixed(2)}</Text>],
                    [<DescForTable name={"Содержание нутриента от суточной потребности в порции"} btn={"pqb"} />, <Text style={styles.textInTable}> {result.pqb.toFixed(2)}</Text>],
                    [<DescForTable name={"Ценовой коэффициент полезности"} btn={"ccu"} />, <Text style={styles.textInTable}> {result.ccu.toFixed(2)}</Text>],
                    [<DescForTable name={"Обратный коэффициент"} btn={"ucc"} />, <Text style={styles.textInTable}> {result.ucc.toFixed(2)}</Text>],
                    [<DescForTable name={"Кол-во порций"} btn={"sp"} />, <Text style={styles.textInTable}> {result.sp.toFixed(2)}</Text>],
                    [<DescForTable name={"Стоимость порций"} btn={"scp"} />, <Text style={styles.textInTable}> {result.scp.toFixed(2)}</Text>]
                ];

                return (
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#0000ff' }} style={{ margin: 10 }}>
                        <Row data={tableHead} flexArr={[2, 1]} textStyle={styles.text} />
                        <Rows data={tableData} flexArr={[2, 1]} textStyle={styles.text} />
                    </Table>
                )
            } else {
                return (<ActivityIndicator size="large" color="#0000ff" />)
            }
        }
    }

    if (props.product.length > 1) {
        return (
            <>
                <ScrollView>
                    <CustomModal />
                    <View style={styles.container}>
                        <CalResult Litem={props.leftSelected} Ritem={props.rightSelected} nutrient={props.nutrientSelected} />
                    </View>
                </ScrollView>
            </>
        );
    } else {
        return (
            <ScrollView>
                <CustomModal />
                <CalResult item={props.product[0]} nutrient={props.nutrientSelected} />
            </ScrollView>
        )
    }
};


export default Calculations;

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: { padding: 5, paddingTop: 30 },
    accord: {
        flexDirection: 'row',
        justifyContent: "space-around"
    },
    leftSelected: {
        borderWidth: 1,
        borderColor: "#20232a",
        borderRadius: 4,
        width: width * 0.45
    },
    rightSelected: {
        borderWidth: 1,
        borderColor: "#20232a",
        borderRadius: 4,
        width: width * 0.45
    },
    table: {
        paddingTop: 5,
        paddingBottom: 5
    },
    textInTable: {
        textAlign: "center",
        height: "auto",
        minHeight: 40,
        textAlignVertical: "center",
        fontSize: 14,
        padding: 5
    },
    btnInTable: {
        textAlign: "center",
        height: "auto",
        display: "flex",
        textAlignVertical: "center",
        fontSize: 14,
        padding: 5,

    },
    icon: {
        position: "absolute",
        top: -5,
        right: 0,
        width: 40
    },
    text: {
        width: "100%",
        textAlign: "center",
        paddingRight: 25,
    },
    resColor: {
        color: "red"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "white",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: width * 0.9,
        height: height * 0.8,
        padding:40,
    },
    modalBackgroun: {
        backgroundColor: "black",
        opacity: 0.5,
        position: "absolute",
        width: "100%",
        height: "100%"
    },
    closeBtn: {
        position:"absolute",
        bottom:0,
        right:0,
        margin:20,
    }
});