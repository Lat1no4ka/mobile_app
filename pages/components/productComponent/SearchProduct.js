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
                                                    WHERE product_name LIKE ? LIMIT 20`, ["%"+param+"%"]);
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
            if (Number(onePortion) > Number(weight)) {
                setMessages("?????????? ?????????? ???????????? ???? ?????????? ???????? ???????????? ?????????? ????????????????")
            } else if (text && price && weight && onePortion && messages == "") {
                let data = {
                    "id": id,
                    "name": text,
                    "price":  price,
                    "weight": weight,
                    "onePortion": onePortion
                };
                product.push(data);
                navigation.navigate('????????????????', { product });
            } else {
                setMessages("???????????? ???????? ?????????????????? ?????? ????????")
            }
        }
        return (
            <View>
                
                <TextInput
                    label="?????????? ???????????????? ?? ??????????????"
                    value={weight}
                    keyboardType='numeric'
                    mode='outlined'
                    style={styles.textInput}
                    onChangeText={weight => { setWeight(weight.replace(",",".")); setMessages(""); }}
                    theme={{ colors: { primary: '#0000FF' } }}
                />
                <TextInput
                    label="???????? ???? ?????????????????? ??????????, ??????."
                    value={price}
                    keyboardType='numeric'
                    mode='outlined'
                    style={styles.textInput}
                    onChangeText={price => {setPrice(price.replace(",",".")); setMessages("") }}
                    theme={{ colors: { primary: '#0000FF' } }}
                />
                <TextInput
                    label="?????????????? ?????????? ?????????? ????????????, ??"
                    value={onePortion}
                    keyboardType='numeric'
                    mode='outlined'
                    style={styles.textInput}
                    onChangeText={onePortion => { setOnePortion(onePortion.replace(",",".")); setMessages(""); }}
                    theme={{ colors: { primary: '#0000FF' } }}
                />
                <Text style={{ textAlign: "center", marginTop: 10, color: "red" }}>{messages}</Text>
                <View style={styles.containerWithBtn}>
                    <Button
                        mode="contained"
                        style={styles.button}
                        onPress={() => sendAllData()}>
                        ????????????????
                </Button>
                </View>
            </View>
        )
    }



    if (data.length > 0 || !searchReady ) {
        return (
            <>
                <ScrollView>
                    <TextInput
                        label="?????????????? ???????????????? ????????????????"
                        mode='outlined'
                        style={styles.container}
                        onChangeText={text => { setText(text); setSearchReady(false) }}
                        value={text}
                        theme={{ colors: { primary: '#0000FF' } }}
                    />
                    {searchReady ? <SearchF /> : <SearchR />}
                </ScrollView>

            </>
        );
    } else if (data.length <= 0) {
        return (
            <TextInput
                label="?????????????? ???????????????? ????????????????"
                value={text}
                mode='outlined'
                style={styles.container}
                onChangeText={text => setText(text)}
                theme={{ colors: { primary: '#0000FF' } }}
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
        backgroundColor:"#0000FF",
        width: 250,
        height: 40,
        margin: 20,

    },
    containerWithBtn: {
        justifyContent: 'center',
        alignItems: 'center'
    }


});


export default SearchProduct;