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
                    color={"blue"}
                    size={50}
                    onPress={() => navigation.navigate('Поиск', { product })}
                    style={styles.AddBtn}
                />
                <View>
                
                    
                    <Text style={styles.head} >HATHELNUT {'\n'}
                    HAve THE Living NUTrient</Text>
                    <Text style={styles.text} >
                    {'\n'}
                    
                    {'\n'}
                    Приложение позволяет вам рассчитать стоимость пищевых веществ, содержащихся в разных видах продукции.
                    {'\n'}
                    Например: вы хотите узнать, где дешевле получить витамин С, из яблока или из апельсина?
                    {'\n'}
                    Ответ на этот и подобные вопросы даст вам приложение.
                    {'\n'}
                    
                    </Text>
                    <Text style={styles.cont} >Для продолжения нажмите на плюсик
                    </Text>
                </View>
            </View>

        );
    }
};


const styles = StyleSheet.create({
    AddBtn: {
        alignSelf: 'flex-end',
    },
    cont: {
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 18,
    },
    text: {
        textAlign: "justify",
        fontSize: 22,
        padding: 20,
        //marginTop: 100
    },
    head: {
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 24,
        //marginTop: 100
    },
    button: {
        width: 250,
        height: 40,
        margin: 20,
        backgroundColor: "blue"

    },
    containerWithBtn: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    arrow: {
        position: "absolute",
        transform: [{ rotate: "95deg" }],
        top: -40,
        right: -35,
    }
});
export default SelectProduct;

