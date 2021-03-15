import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native';
import { TextInput, List, Button } from 'react-native-paper';
import SqlClient from '../../../CommonClient/SqlClient/SqlClient';

const SearchProduct = ({ route, navigation }) => {
    const [client, setClient] = useState(SqlClient());
    const [id, setId] = useState('');
    const [text, setText] = useState('');
    const [data, setData] = useState([]);
    const [searchReady, setSearchReady] = useState(false);
    const product = route.params.product;
    
    const productName = product.map(item => {
        return item.name;
    })
    //const name = () => { client.getProduct('name', 'PRODUCT').finally((res)=>{console.log(res)}) };
    useEffect(() => {
        if (text.length == 0) {
            setSearchReady(false);
            setText('');
            setData([]);
        } else if (text.length > 0) {
            
            getData(text);
        }
    }, [text]);

    const getData = async (param) => {
        let product = [];
        let selectQuery = await client.ExecuteQuery(`SELECT id,product_name FROM PRODUCT 
                                                    WHERE product_name LIKE ? LIMIT 10`, ["%"+param+"%"]);
        var rows = selectQuery.rows;
        for (let i = 0; i < rows.length; i++) {
            let value = rows.item(i).product_name;
            let id = rows.item(i).id;
            product.push({ "id": id.toString(), 'name': value });
        }
        setData(product);
    }



    const onItemHendler = (id, name) => {
        setId(id);
        setText(name);
        setData([]);
        setSearchReady(true);
    }

    const renderItem = ({ item }) => (

        <List.Item
            title={item.name}
            onPress={() => onItemHendler(item.id, item.name)}
        />

    )

    const SearchR = () => {
        let formatData = data.filter(item => {
            if(!productName.includes(item.name)){
                return item;
            }
        })
        return (
            <SafeAreaView style={styles.serachView} >
                <FlatList
                    keyboardShouldPersistTaps='handled'
                    data={formatData}
                    renderItem={renderItem}
                />
            </SafeAreaView>
        )
    }

    const SearchF = () => {
        const [price, setPrice] = useState();
        const [weight, setWeight] = useState();
        const [onePortion, setOnePortion] = useState();
        const [messages, setMessages] = useState("");
        useEffect(() => {
        }, [messages]);

        const sendAllData = () => {

            if (onePortion > weight) {
                setMessages("Масса одной порции не может быть больше массы продукта")
            } else if (text && price && weight && onePortion && messages == "") {
                let data = {
                    "id": id,
                    "name": text,
                    "price": price.replaceAll(",","."),
                    "weight": weight.replaceAll(",","."),
                    "onePortion": onePortion.replaceAll(",",".")
                };
                product.push(data);
                navigation.navigate('Продукты', { product });
            } else {
                setMessages("Должны быть заполнены все поля")
            }
        }
        return (
            <View>
                <TextInput
                    label="Введите цену продукта, руб."
                    value={price}
                    keyboardType='numeric'
                    mode='outlined'
                    style={styles.textInput}
                    onChangeText={price => { setPrice(price); setMessages(""); }}
                    theme={{ colors: { primary: 'blue' } }}
                />
                <TextInput
                    label="Введите вес продукта, г."
                    value={weight}
                    keyboardType='numeric'
                    mode='outlined'
                    style={styles.textInput}
                    onChangeText={weight => { setWeight(weight); setMessages(""); }}
                    theme={{ colors: { primary: 'blue' } }}
                />
                <TextInput
                    label="Введите массу одной порции, г."
                    value={onePortion}
                    keyboardType='numeric'
                    mode='outlined'
                    style={styles.textInput}
                    onChangeText={onePortion => { setOnePortion(onePortion); setMessages(""); }}
                    theme={{ colors: { primary: 'blue' } }}
                />
                <Text style={{ textAlign: "center", marginTop: 10, color: "red" }}>{messages}</Text>
                <View style={styles.containerWithBtn}>
                    <Button
                        mode="contained"
                        style={styles.button}
                        onPress={() => sendAllData()}>
                        Добавить
                </Button>
                </View>
            </View>
        )
    }



    if (data.length > 0 || !searchReady ) {
        return (
            <>
                <SafeAreaView>
                    <TextInput
                        label="Введите название продукта"
                        mode='outlined'
                        style={styles.container}
                        onChangeText={text => { setText(text); setSearchReady(false) }}
                        value={text}
                        theme={{ colors: { primary: 'blue' } }}
                    />
                    {searchReady ? <SearchF /> : <SearchR />}
                </SafeAreaView>

            </>
        );
    } else if (data.length <= 0) {
        return (
            <TextInput
                label="Введите название продукта"
                value={text}
                mode='outlined'
                style={styles.container}
                onChangeText={text => setText(text)}
                theme={{ colors: { primary: 'blue' } }}
            />

        )

    }

};
const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        marginRight: 20,
        marginLeft: 20,
        marginTop: height * 0.15
    },
    textInput: {
        marginRight: 20,
        marginLeft: 20,
        marginTop: 20
    },
    serachView: {
        marginRight: 20,
        marginLeft: 20,
        maxHeight: height * 0.4
    },
    renderItem:
    {
        marginRight: 20,
        marginLeft: 20,
        color: 'black',
        padding: 10,
    },
    button: {
        width: 120,
        height: 40,
        margin: 20,

    },
    containerWithBtn: {
        justifyContent: 'center',
        alignItems: 'center'
    }


});


export default SearchProduct;