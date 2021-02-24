import React, { useState, useEffect } from 'react';
import calculation from "../../../services/calculation/Calcualtion";
import ListItem from "./ListItem";
import { List } from 'react-native-paper';
import { StyleSheet, Dimensions, View, Text } from 'react-native';


const Calculations = ({ route, navigation }) => {
    const product = route.params.data;
    const [leftSelected, setLeftSelected] = useState([]);
    const [rightSelected, setRightSelected] = useState([]);
    const [focusL, setFocusL] = useState(false);
    const [focusR, setFocusR] = useState(false);
    const [fromDailyRate, setFromDailyRate] = useState();
    const items = route.params.data;

    const checkedItem = route.params.checkedItem.filter((check) => {
        return check != null ? check : null;
    })



    useEffect(() => {
        if (product.length >= 2) {
            setLeftSelected(product[0]);
            setRightSelected(product[1]);
        }
    }, []);

    const calcOneItem = (item) => {
        let nut = checkedItem[0];
        let test = calculation(item).nutrientFromDailyRate(nut.key);
        console.log(test);
        return (<Text> Содержание нутриента в продукции от суточной потребности в 100г, % (qb)  {test}</Text>);
    }

    return (
        <>
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
                {
                    product.map((item) => {
                       return calcOneItem(item);
                    })
                }
            </View>
        </>
    );
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