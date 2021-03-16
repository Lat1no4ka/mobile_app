import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import { IconButton, Colors, Card, Title, Paragraph, Button } from 'react-native-paper';
import CardItem from "./CardItem";



const SelectProduct = ({ route, navigation }) => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
    }, []);

    const removeItem = (id) => {
        let filtered = (product.filter((item) => {
            return (item ? item.id !== id : null)
        }));
        setProduct(filtered)
    }

    if (product.length > 0) {
        return (
            <ScrollView>
                <IconButton
                    icon="add-circle-outline"
                    color="blue"
                    size={50}
                    onPress={() => navigation.navigate('Поиск', { product })}
                    style={styles.AddBtn}
                />
                <View>
                    {
                        product.map((item) => {
                            return <CardItem item={item} key={item.id} removeItem={removeItem} />
                        })
                    }
                    <View style={styles.containerWithBtn}>
                        <Button
                            mode="contained"
                            style={styles.button}
                            onPress={() => navigation.navigate('Нутриенты', { product })}>
                            Выбрать нутриенты
                        </Button>
                    </View>
                </View>
            </ScrollView>
        );
    }
    else {
        return (
            <View>
                <IconButton
                    icon="add-circle-outline"
                    color={Colors.blue800}
                    size={50}
                    onPress={() => navigation.navigate('Поиск', { product })}
                    style={styles.AddBtn}
                />
                <View>
                    <Text style={styles.text} >Для продолжения выберите хотя бы один продукт!</Text>
                </View>
            </View>

        );
    }
};


const styles = StyleSheet.create({
    AddBtn: {
        alignSelf: 'flex-end',
    },
    text: {
        textAlign: "center",
        fontSize: 24,
        padding: 20,
        marginTop: 100
    },
    button: {
        width: 250,
        height: 40,
        margin: 20,
        backgroundColor:"blue"

    },
    containerWithBtn: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default SelectProduct;

