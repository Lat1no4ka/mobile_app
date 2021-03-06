import React, { useState, useEffect } from 'react';
import * as calculation from "../../../services/calculation/Calcualtion";
import Dropdown from "./Dropdown";
import { List, ActivityIndicator, Colors } from 'react-native-paper';
import { StyleSheet, Dimensions, View, processColor, ScrollView } from 'react-native';
import { BarChart } from 'react-native-charts-wrapper';

const ChartsWrapper = (props) => {
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
                return (
                    <View style={{ flex: 1 }}>
                        <View style={styles.container}>
                            <BarChart style={styles.chart}
                                legend={{
                                    enabled: true,
                                    textSize: 12,
                                    form: "SQUARE",
                                    formSize: 14,
                                    xEntrySpace: 1,
                                    yEntrySpace: 1,
                                    wordWrapEnabled: true
                                }}
                                data={{
                                    dataSets: [{
                                        values: [Lresult.qb, Lresult.pqb, Lresult.ccu, Lresult.sp, Lresult.scp],
                                        label: 'Продукт 1',
                                        config: {
                                            drawValues: false,
                                            colors: [processColor('blue')],
                                        }
                                    },
                                    {
                                        values: [Rresult.qb, Rresult.pqb, Rresult.ccu, Rresult.sp, Rresult.scp],
                                        label: 'Company B',
                                        config: {
                                            drawValues: false,
                                            colors: [processColor('red')],
                                        }
                                    }],
                                    config: {
                                        barWidth: 0.2,
                                        group: {
                                            fromX: 0,
                                            groupSpace: 0.1,
                                            barSpace: 0.1,
                                        },
                                    },
                                }}
                            />
                        </View>
                    </View>
                )
            } else {
                return (<ActivityIndicator size="large" color="#0000ff" />)
            }
        } else {
            let item = { "item": params.item, "nutrient": params.nutrient };
            let result = calcOneItem(item);
            if (result) {
                return (
                    <View style={{ flex: 1 }}>
                        <View style={styles.container}>
                            <BarChart style={styles.chart}
                                legend={{
                                    enabled: true,
                                    textSize: 14,
                                    form: "SQUARE",
                                    formSize: 20,
                                    xEntrySpace: 1,
                                    yEntrySpace: 1,
                                    wordWrapEnabled: true
                                }}

                                data={{
                                    dataSets: [{
                                        values: [result.qb, result.pqb, result.ccu, result.sp, result.scp],
                                        label: 'Продукт 1',
                                        config: {
                                            drawValues: false,
                                            colors: [processColor('blue')],
                                        }
                                    }]
                                }}
                            />
                        </View>
                    </View>
                )
            } else {
                return (<ActivityIndicator animating={true} color={Colors.red800} />)
            }
        }
    }

    console.log(props)
    if (props.product.length > 1) {
        return (
            <>
                <CalResult Litem={props.leftSelected} Ritem={props.rightSelected} nutrient={props.nutrientSelected} />
            </>
        );
    } else {
        return (
            <CalResult item={props.product[0]} nutrient={props.nutrientSelected} />
        )
    }
};


export default ChartsWrapper;

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
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
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    chart: {
        flex: 1
    }
});