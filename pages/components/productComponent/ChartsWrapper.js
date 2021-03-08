import React, { useState, useEffect } from 'react';
import * as calculation from "../../../services/calculation/Calcualtion";
import { List, ActivityIndicator, Colors } from 'react-native-paper';
import { StyleSheet, Dimensions, View, Text, processColor } from 'react-native';
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
        console.log(params)
        let items = params.items.map((item) => {
            return calcOneItem({ "item": item, "nutrient": params.nutrient });
        })
        if (items.every(item => item)) {
            let res = items.map((item) => {
                return item[props.resCalc.key]
            })
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
                                    values: res,
                                    label: props.resCalc.name,
                                    config: {
                                        drawValues: false,
                                        colors: [processColor('blue')],
                                    }
                                }],
                                config: {
                                    barWidth: 0.3,
                                }
                            }}
                        />
                    </View>
                </View>
            )
        } else {
            return (<ActivityIndicator animating={true} color={Colors.red800} />)
        }
    }

    return (
        <>
            <CalResult items={props.product} nutrient={props.nutrientSelected} />
        </>
    )
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