import React, { useState, useEffect } from 'react';
import ListItem from "./ListItem";
import { List, ActivityIndicator, Colors } from 'react-native-paper';
import { StyleSheet, Dimensions, View, Text, ScrollView } from 'react-native';

const Dropdown = (props) => {
    const [focusL, setFocusL] = useState(false);
    const [focusR, setFocusR] = useState(false);
    return (
        <List.Section style={styles.accord}>
            <List.Accordion
                title={props.leftSelected.name}
                style={styles.leftSelected}
                expanded={focusL}
                onPress={() => setFocusL(!focusL)}
            >
                {
                    props.product.map((item) => {
                        return <ListItem
                            item={item}
                            key={item.id}
                            setSelected={props.setL}
                            setFocus={setFocusL}
                            focus={focusL}
                        />
                    })
                }
            </List.Accordion>

            <List.Accordion
                title={props.rightSelected.name}
                style={styles.rightSelected}
                expanded={focusR}
                onPress={() => setFocusR(!focusR)}
            >
                {
                    props.product.map((item) => {
                        return <ListItem
                            item={item}
                            key={item.id}
                            setSelected={props.setR}
                            setFocus={setFocusR}
                            focus={focusR} />
                    })
                }
            </List.Accordion>
        </List.Section>
    )
}

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

export default Dropdown;