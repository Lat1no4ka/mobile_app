import React, { useState, useEffect } from 'react';
import * as calculation from "../../../services/calculation/Calcualtion";
import { Table, Row, Rows } from 'react-native-table-component';
import { ActivityIndicator } from "react-native";
import { StyleSheet, Dimensions, View, Text, ScrollView } from 'react-native';


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

    const CalResult = (params) => {
        if (Object.keys(params).length > 2) {
            let Litem = { "item": params.Litem, "nutrient": params.nutrient };
            let Ritem = { "item": params.Ritem, "nutrient": params.nutrient };
            let Lresult = calcOneItem(Litem);
            let Rresult = calcOneItem(Ritem);
            if (Rresult && Lresult) {
                let tableHead = [params.Litem.name, Lresult.nutrient_name, params.Ritem.name];
                let tableData = [
                    [Lresult.qb.toFixed(2), "Содержание нутриента в продукции от суточной потребности в 100г, %", Rresult.qb.toFixed(2)],
                    [Lresult.pqb.toFixed(2), "Содержание нутриента в продукции от суточной потребности в порции, %", Rresult.pqb.toFixed(2)],
                    [Lresult.ccu.toFixed(2), "Ценовой коэффициент полезности, руб/%", Rresult.ccu.toFixed(2)],
                    [Lresult.ucc.toFixed(2), "Обратный коэффициент, %/руб", Rresult.ucc.toFixed(2)],
                    [Lresult.sp.toFixed(2), "Кол-во порций, шт", Rresult.sp.toFixed(2)],
                    [Lresult.scp.toFixed(2), "Стоимость порций, руб.", Rresult.scp.toFixed(2)]
                ];
                return (
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#0000ff' }}>
                        <Row data={tableHead} flexArr={[1, 2, 1]} textStyle={styles.text}  />
                        <Rows data={tableData} flexArr={[1, 2, 1]} textStyle={styles.text}  />
                    </Table>
                )
            } else {
                return (<ActivityIndicator size="large" color="#0000ff" />)
            }
        } else {
            let item = { "item": params.item, "nutrient": params.nutrient };
            let result = calcOneItem(item);
            if (result) {
                let tableHead = [result.nutrient_name, params.item.name];
                let tableData = [
                    ["Содержание нутриента в продукции от суточной потребности в 100г, %", result.qb.toFixed(2)],
                    ["Содержание нутриента в продукции от суточной потребности в порции, %", result.pqb.toFixed(2)],
                    ["Ценовой коэффициент полезности, руб/%", result.ccu.toFixed(2)],
                    ["Обратный коэффициент, %/руб", result.ucc.toFixed(2)],
                    ["Кол-во порций, шт", result.sp.toFixed(2)],
                    ["Стоимость порций, руб.", result.scp.toFixed(2)]
                ];
                return (
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#0000ff' }}>
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
    table:{
        paddingTop:5,
        paddingBottom:5
    },
    text: { textAlign: 'center' },

});