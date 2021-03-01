import React, { useState, useEffect } from 'react';
import * as calculation from "../../../services/calculation/Calcualtion";
import ListItem from "./ListItem";
import { List, ActivityIndicator, Colors } from 'react-native-paper';
import { StyleSheet, Dimensions, View, Text, ScrollView } from 'react-native';


const Calculations = ({ route, navigation }) => {
    const product = route.params.data;
    const [leftSelected, setLeftSelected] = useState(null);
    const [rightSelected, setRightSelected] = useState(null);
    const [focusL, setFocusL] = useState(false);
    const [focusR, setFocusR] = useState(false);

    const checkedItem = route.params.checkedItem.filter((check) => {
        return check != null ? check : null;
    })



    useEffect(() => {
        if (product.length > 1) {
            setLeftSelected(product[0]);
            setRightSelected(product[1]);
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
                                    <Text>{info.qb}</Text>
                                    <Text>{info.pqb}</Text>
                                    <Text>{info.ccu}</Text>
                                    <Text>{info.ucc}</Text>
                                    <Text>{info.sp}</Text>
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

    if (product.length > 2) {
        return (
            <>
                {calcOneItem()}
                <List.Section style={styles.accord}>
                    <List.Accordion
                        title={leftSelected.name}
                        style={styles.leftSelected}
                        expanded={focusL}
                        onPress={() => setFocusL(!focusL)}
                    >
                        {
                            product.map((item) => {
                                return <ListItem
                                    item={item}
                                    key={item.id}
                                    setSelected={setLeftSelected}
                                    setFocus={setFocusL}
                                    focus={focusL}
                                />
                            })
                        }
                    </List.Accordion>

                    <List.Accordion
                        title={rightSelected.name}
                        style={styles.rightSelected}
                        expanded={focusR}
                        onPress={() => setFocusR(!focusR)}
                    >
                        {
                            product.map((item) => {
                                return <ListItem
                                    item={item}
                                    key={item.id}
                                    setSelected={setRightSelected}
                                    setFocus={setFocusR}
                                    focus={focusR} />
                            })
                        }
                    </List.Accordion>
                </List.Section>
                <View>

                </View>
            </>
        );
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