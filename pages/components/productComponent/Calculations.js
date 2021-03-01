import React, { useState, useEffect } from 'react';
import * as calculation from "../../../services/calculation/Calcualtion";
import Dropdown from "./Dropdown";
import { List, ActivityIndicator, Colors } from 'react-native-paper';
import { StyleSheet, Dimensions, View, Text, ScrollView } from 'react-native';


const Calculations = (props) => {
    const product = props.params.data;

    const checkedItem = props.params.checkedItem.filter((check) => {
        return check != null ? check : null;
    })



    useEffect(() => {
        if (product.length > 1) {
            props.setLeftSelected(product[0]);
            props.setRightSelected(product[1]);
        }
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
            return (
                <View>
                    {
                        result.map((info) => {
                            return (
                                <View>
                                    <Text>Расчет для {info.nutrient_name}</Text>
                                    <Text>Содержание нутриента в продукции от суточной потребности в 100г, %</Text>
                                    <Text>{info.qb}</Text>
                                    <Text>Содержание нутриента в продукции от суточной потребности в порции, %</Text>
                                    <Text>{info.pqb}</Text>
                                    <Text>Ценовой коэффициент полезности, руб/%</Text>
                                    <Text>{info.ccu}</Text>
                                    <Text>Обратный коэффициент, %/руб</Text>
                                    <Text>{info.ucc}</Text>
                                    <Text>Кол-во порций, шт</Text>
                                    <Text>{info.sp}</Text>
                                    <Text>Стоимость порций, руб.</Text>
                                    <Text>{info.scp}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            )
        } else {
            return (<ActivityIndicator animating={true} color={Colors.red800} />)
        }
    }

    if (product.length > 1) {
        if (props.leftSelected && props.rightSelected) {
            return (
                <>
                    <Dropdown
                        product={product}
                        leftSelected={props.leftSelected}
                        rightSelected={props.rightSelected}
                        setR={props.setRightSelected}
                        setL={props.setLeftSelected}
                    />
                    <ScrollView>
                        <View>
                            <CalResult item={props.leftSelected} />
                            <CalResult item={props.rightSelected} />
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
            <ScrollView>
                {
                    product.map((item, index) => {
                        return <CalResult item={item} key={index} />
                    })
                }

            </ScrollView>
        )
    }
};


export default Calculations;

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
});