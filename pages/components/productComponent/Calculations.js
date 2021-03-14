import React, { useState, useEffect } from 'react';
import * as calculation from "../../../services/calculation/Calcualtion";
import { Table, Row, Rows } from 'react-native-table-component';
import { ActivityIndicator } from "react-native";
import { StyleSheet, Dimensions, View, Text, ScrollView, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';


const Calculations = (props) => {

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
        if (res1 < res2) {
            return (styles.resColor)
        } else {
            return ("");
        }
    }

    const createButtonAlert = (messages) => {
        Alert.alert(
            "",
            messages,
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }


    const DescButton = (props) => {
        let key = props.btn;
        const messages = { "qb": "qb", "pqb": "pqb", "ccu": "ccu", "ucc": "ucc", "sp": "sp", "scp": "scp" }
        return (<IconButton
            icon="help-circle-outline"
            size={25}
            color="blue"
            onPress={() => createButtonAlert(messages[key])}
        />)
    }

    const DescForTable = (props) => {
        return (
            <>
                <View style={[styles.btnInTable,styles.textInTable]}>
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
                    [<Text style={[styles.textInTable, resColor(Lresult.qb, Rresult.qb)]}>{Lresult.qb.toFixed(2)}</Text>, <DescForTable name={"Содержание нутриента от суточной потребности в 100\u00A0г."} btn={"qb"} />, <Text style={[styles.textInTable, resColor(Rresult.qb, Lresult.qb)]}>{Rresult.qb.toFixed(2)}</Text>],
                    [<Text style={[styles.textInTable, resColor(Lresult.pqb, Rresult.pqb)]}>{Lresult.pqb.toFixed(2)}</Text>, <DescForTable name={"Содержание нутриента от суточной потребности в порции"} btn={"pqb"} />, <Text style={[styles.textInTable, resColor(Rresult.pqb, Lresult.pqb)]}>{Rresult.pqb.toFixed(2)}</Text>],
                    [<Text style={[styles.textInTable, resColor(Lresult.ccu, Rresult.ccu)]}>{Lresult.ccu.toFixed(2)}</Text>, <DescForTable name={"Ценовой коэффициент полезности"} btn={"ccu"} />, <Text style={[styles.textInTable, resColor(Rresult.ccu, Lresult.ccu)]}>{Rresult.ccu.toFixed(2)}</Text>],
                    [<Text style={[styles.textInTable, resColor(Lresult.ucc, Rresult.ucc)]}>{Lresult.ucc.toFixed(2)}</Text>, <DescForTable name={"Обратный коэффициент"} btn={"ucc"} />, <Text style={[styles.textInTable, resColor(Rresult.ucc, Lresult.ucc)]}>{Rresult.ucc.toFixed(2)}</Text>],
                    [<Text style={[styles.textInTable, resColor(Lresult.sp, Rresult.sp)]}>{Lresult.sp.toFixed(2)}</Text>, <DescForTable name={"Кол-во порций"} btn={"sp"} />, <Text style={[styles.textInTable, resColor(Rresult.sp, Lresult.sp)]}>{Rresult.sp.toFixed(2)}</Text>],
                    [<Text style={[styles.textInTable, resColor(Lresult.scp, Rresult.scp)]}>{Lresult.scp.toFixed(2)}</Text>, <DescForTable name={"Стоимость порций"} btn={"scp"} />, <Text style={[styles.textInTable, resColor(Rresult.scp, Lresult.scp)]}>{Rresult.scp.toFixed(2)}</Text>]
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
                    <View style={styles.container}>
                        <CalResult Litem={props.leftSelected} Ritem={props.rightSelected} nutrient={props.nutrientSelected} />
                    </View>
                </ScrollView>
            </>
        );
    } else {
        return (
            <ScrollView>
                <CalResult item={props.product[0]} nutrient={props.nutrientSelected} />
            </ScrollView>
        )
    }
};


export default Calculations;

const { width } = Dimensions.get('window');
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
        display:"flex",
        textAlignVertical: "center",
        fontSize: 14,
        padding: 5,
        
    },
    icon:{
        position:"absolute",
        top:-5,
        right:0,
        width:40
    },
    text:{
        width:"100%",
        textAlign:"center",
        paddingRight:20
    },
    resColor: {
        color: "red"
    }
});