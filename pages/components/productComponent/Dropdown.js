import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { List, ActivityIndicator, Colors } from 'react-native-paper';
import ListItem from "./ListItem";

const Dropdown = (props) => {
    const [focusL, setFocusL] = useState(false);
    const [focusR, setFocusR] = useState(false);
    const [focusN, setFocusN] = useState(false);
    if (props.product.length > 1) {
        return (
            <>
                <List.Section>
                    <List.Accordion
                        style={styles.selected}
                        title={props.leftSelected.name}
                        expanded={focusL}
                        onPress={() => setFocusL(!focusL)}
                    >
                        {
                            props.product.map((item) => {
                                return <ListItem
                                    item={item}
                                    key={item.id}
                                    setSelected={props.setLeftSelected}
                                    setFocus={setFocusL}
                                    focus={focusL}
                                />
                            })
                        }
                    </List.Accordion>

                    <List.Accordion
                        style={styles.selected}
                        title={props.rightSelected.name}
                        expanded={focusR}
                        onPress={() => setFocusR(!focusR)}
                    >
                        {
                            props.product.map((item) => {
                                return <ListItem
                                    item={item}
                                    key={item.id}
                                    setSelected={props.setRightSelected}
                                    setFocus={setFocusR}
                                    focus={focusR} />
                            })
                        }
                    </List.Accordion>
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
                </List.Section>
            </>
        )
    } else {
        return (
            <>
                <List.Section>
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
                </List.Section>
            </>
        )
    }
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    accord: {

    },
    selected: {
        borderWidth: 1,
        borderColor: "#20232a",
        borderRadius: 4,
        width: width * 0.95,
        margin: 10
    },
});

export default Dropdown;