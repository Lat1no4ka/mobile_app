import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions,ScrollView } from 'react-native';
import { List, ActivityIndicator, Colors } from 'react-native-paper';
import ListItem from "./ListItem";



const DropdownCharts = (props) => {
    const [focusR, setFocusR] = useState(false);
    const [focusN, setFocusN] = useState(false);


    const checkCalc = [
        { "name": "Содержание от суточной потребности в 100г, %", "key": "qb" },
        { "name": "Содержание от суточной потребности в порции, %", "key": "pqb" },
        { "name": "Ценовой коэффициент полезности, руб/%", "key": "ccu" },
        { "name": "Обратный коэффициент, %/руб", "key": "ucc" },
        { "name": "Кол-во порций, шт", "key": "sp" },
        { "name": "Стоимость порций, руб.", "key": "scp" }
    ]

    return (
        <>
            <List.Section style={styles.section}>

                <ScrollView>
                    <List.Accordion
                        style={styles.selected}
                        title={props.nutrientSelected.name}

                        expanded={focusN}
                        onPress={() => setFocusN(!focusN)}
                    >
                        {
                            props.checkedItem.map((item) => {
                                return <ListItem
                                    item={item}
                                    key={item.key}
                                    setSelected={props.setNutrientSelected}
                                    setFocus={setFocusN}
                                    focus={focusN} />
                            })
                        }
                    </List.Accordion>
                    <List.Accordion
                        style={styles.selected}
                        title={props.resCalc.name}
                        expanded={focusR}
                        onPress={() => setFocusR(!focusR)}
                    >
                        {
                            checkCalc.map((item, index) => {
                                return <ListItem
                                    item={item}
                                    key={index}
                                    setSelected={props.setResCalc}
                                    setFocus={setFocusR}
                                    focus={focusR} />
                            })
                        }
                    </List.Accordion>
                </ScrollView>
            </List.Section>
        </>
    )
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    accord: {

    },
    selected: {
        borderWidth: 1,
        borderColor: "#20232a",
        borderRadius: 4,
        width: width * 0.75,
        margin: 10,
    },
    section: {
        maxHeight: height * 0.4,
        maxWidth: width
    }
});


export default DropdownCharts;