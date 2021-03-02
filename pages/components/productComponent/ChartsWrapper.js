import React, { useState, useEffect } from 'react';
import * as calculation from "../../../services/calculation/Calcualtion";
import Dropdown from "./Dropdown";
import { List, ActivityIndicator, Colors } from 'react-native-paper';
import { StyleSheet, Dimensions, View, processColor, ScrollView } from 'react-native';
import { BarChart } from 'react-native-charts-wrapper';

const ChartsWrapper = (props) => {
    const product = props.params.data;
    console.log(props)
    const leftSelected = (props.leftSelected);
    const rightSelected = (props.rightSelected);

    const checkedItem = props.params.checkedItem.filter((check) => {
        return check != null ? check : null;
    })



    useEffect(() => {
    }, []);


    const calcOneItem = (item) => {
        let result = [];
        let data = calculation.dataFromDB(item);
        if (data) {
            checkedItem.forEach(nutrient => {
                let qb = calculation.qb(data.dayliRate, data.product, nutrient);
                let pqb = calculation.pqb(qb, item);
                let ccu = calculation.ccu(pqb, item);
                let ucc = calculation.ucc(pqb, item)
                let sp = calculation.sp(pqb)
                let scp = calculation.scp(sp, item)
                result.push({
                    "nutrient_name": nutrient.name,
                    "qb": qb,
                    "pqb": pqb,
                    "ccu": ccu,
                    "ucc": ucc,
                    "sp": sp,
                    "scp": scp,
                })
            });
            if (result.length > 0) {
                return result;
            }
        }


    }

    const CalResult = (props) => {

        let result = calcOneItem(props.item);

        if (result) {
           let info = result[0];
            return (
                // {
                //     result.map((info) => {
                //         return (
                //             <View>
                //                 <Text>Расчет для {info.nutrient_name}</Text>

                //                 <Text>{info.qb}</Text>
                //                 <Text>{info.pqb}</Text>
                //                 <Text>{info.ccu}</Text>
                //                 <Text>{info.ucc}</Text>
                //                 <Text>{info.sp}</Text>
                //                 <Text>{info.scp}</Text>
                //             </View>
                //         )
                //     })
                // }
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
                                    values: [info.qb, info.pqb, info.ccu, info.sp, info.scp],
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

    if (product.length > 1) {
        if (leftSelected && rightSelected) {
            return (
                <>
                    <ScrollView>
                        <View>
                            <CalResult item={leftSelected} />
                            <CalResult item={rightSelected} />
                        </View>
                    </ScrollView>
                </>
            );
        } else {
            return (<>
                <ActivityIndicator animating={true} color={Colors.blue800} />
            </>)
        }
    } else {
        return (
            <CalResult item={product[0]} />
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