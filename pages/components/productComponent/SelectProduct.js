import React, { useState, useEffect } from 'react';
import { IconButton, Colors, Card, Title, Paragraph, Button } from 'react-native-paper';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import CardItem from "./CardItem";



const SelectProduct = ({ route, navigation }) => {
    const [product, setProduct] = useState([]);

    useEffect(() => {

        if (route.params) {
            setProduct(route.params.product)
        }
    }, []);

    const removeItem = (id) => {
        filtered =  (product.filter((item) => {
            return (item ? item.id !== id : null) 
        }));
        setProduct(filtered)
    }


    if (product.length > 0) {
        return (
            <ScrollView>
                <IconButton
                    icon="add-circle-outline"
                    color={Colors.blue800}
                    size={50}
                    onPress={() => navigation.navigate('Поиск', { product })}
                    style={styles.AddBtn}
                />
                <View>
                    {
                        product.map((item) => {
                            return <CardItem item={item} key={item.id} removeItem={removeItem} />
                        })}
                    <Button
                        mode="contained"
                        style={styles.button}
                        onPress={() => navigation.navigate('Нутриенты', { product })}>
                        Дальше
                </Button>
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
            </View>

        );
    }
};


const styles = StyleSheet.create({
    AddBtn: {
        alignSelf: 'flex-end',
    },
});
export default SelectProduct;

