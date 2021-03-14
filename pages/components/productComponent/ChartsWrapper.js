import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View, Text, processColor } from 'react-native';
import { List, ActivityIndicator, Colors } from 'react-native-paper';
import * as calculation from "../../../services/calculation/Calcualtion";
import { BarChart } from 'react-native-charts-wrapper';

const ChartsWrapper = (props) => {
    const color = ['#800000', //Red
        '#ED6A2A', //Orange
        '#1BD170', //Green
        '#22D2E6', //Aqua
        '#2A3BEF', //Blue
        '#EF2AD2', //Purple 
        '#EF2A2A'] //Pink
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
        let name = params.items.map((item) => {
            return item.name;
        })

        let items = params.items.map((item) => {
            return calcOneItem({ "item": item, "nutrient": params.nutrient });
        })



        if (items.every(item => item)) {
            let res = items.map((item) => {
                return item[props.resCalc.key]
            })
            let dataSet = res.map((item, index) => {
                return ({
                    values: [item],
                    label: name[index],
                    config: {
                        color: processColor(color[index]),
                        valueTextSize: 14
                    }
                });
            })
            let config = null;
            if (dataSet.length > 1) {
                config = {
                    barWidth: 0.1,
                    group: {
                        fromX: 0,
                        groupSpace: 0,
                        barSpace: 0.9,
                    },
                }
            } else {
                config = {
                    barWidth: 0.3,
                }
            }
            return (
                <View style={{ flex: 1, margin: 10 }}>
                    <View style={styles.container}>
                        <BarChart style={styles.chart}
                            drawValueAboveBar={true}
                            drawHighlightArrow={true}
                            drawBarShadow={false}
                            legend={{
                                enabled: true,
                                textSize: 16,
                                form: "SQUARE",
                                formSize: 10,
                                wordWrapEnabled: true,
                            }}

                            data={{
                                dataSets: dataSet,
                                config: config
                            }}
                            xAxis={{
                                granularityEnabled: true,
                                granularity: 1,
                                axisMaximum: name.length,
                                axisMinimum: name.length > 1 ? 0 : -1,
                                centerAxisLabels: true,
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
        flex: 1,
        maxWidth: width,
    }
});