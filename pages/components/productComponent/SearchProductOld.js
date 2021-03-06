import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, FlatList,ScrollView } from 'react-native';
import { TextInput, List, Button } from 'react-native-paper';
import SqlClient from '../../../CommonClient/SqlClient/SqlClient';

const SearchProduct = ({ route, navigation }) => {
    const [id, setId] = useState('');
    const [text, setText] = useState('');
    const [data, setData] = useState([]);
    const [client, setClient] = useState(SqlClient());
    const [focus, setFocus] = useState(false);
    const [price, setPrice] = useState();
    const [weight, setWeight] = useState();
    const [onePortion, setOnePortion] = useState();
    const [searchReady, setSearchReady] = useState(false);

    const product = route.params.product;

    const inputEl = useRef(null);

    //const name = () => { client.getProduct('name', 'PRODUCT').finally((res)=>{console.log(res)}) };

    useEffect(() => {
        searchList(text);
    }, [text]);
    const searchList = (search) => {

        if (search.length > 0) {
            getData(search);
        } else {
            setText('');
            setData([]);
        }
    }

    const getData = async (param) => {
        let product = [];
        let selectQuery = await client.ExecuteQuery(`SELECT id,product_name FROM PRODUCT 
                                                    WHERE product_name LIKE '%${param}%' LIMIT 20`, []);
        var rows = selectQuery.rows;
        for (let i = 0; i < rows.length; i++) {
            let value = rows.item(i).product_name;
            let id = rows.item(i).id;
            product.push({ "id": id.toString(), 'name': value });
        }
        setData(product);
    }

    const sendAllData = () => {

        let data = {
            "id": id,
            "name": text,
            "price": price,
            "weight": weight,
            "onePortion": onePortion
        };

        product.push(data);
        navigation.navigate('Продукты', { product });
    }

    const onItemHendler = (id, name) => {
        setId(id);
        setText(name);
        setFocus(false);
        setSearchReady(true);
        inputEl.current.blur();
    }

    const renderItem = ({ item }) => (

        <List.Item
            title={item.name}
            onPress={() => onItemHendler(item.id, item.name)}
        />

    )

    if (data.length > 0 && focus) {
        return (
            <>
                <TextInput
                    label="Введите название продукта"
                    mode='outlined'
                    ref={inputEl}
                    style={styles.container}
                    onChangeText={text => setText(text)}
                    value={text}
                    theme={{ colors: { primary: '#0000FF' } }}
                />
                <SafeAreaView style={styles.serachView} >
                    <FlatList
                        keyboardShouldPersistTaps='handled'
                        data={data}
                        renderItem={renderItem}
                    />

                </SafeAreaView>

            </>
        );
    } else if (searchReady) {
        return (
            <>
                <ScrollView>
                    <TextInput
                        label="Введите название продукта"
                        value={text}
                        mode='outlined'
                        style={styles.container}
                        onChangeText={text => setText(text)}
                        onFocus={() => setFocus(true)}
                        theme={{ colors: { primary: '#0000FF' } }}
                    />
                    
                    <TextInput
                        label="Масса продукта в граммах"
                        value={weight}
                        keyboardType='numeric'
                        mode='outlined'
                        style={styles.textInput}
                        onChangeText={weight => setWeight(weight)}
                        theme={{ colors: { primary: '#0000FF' } }}
                    />
                    <TextInput
                        label="Цена за указанную массу, руб."
                        value={price}
                        keyboardType='numeric'
                        mode='outlined'
                        style={styles.textInput}
                        onChangeText={price => setPrice(price)}
                        theme={{ colors: { primary: '#0000FF' } }}
                    />
                    <TextInput
                        label="Введите массу одной порции, г"
                        value={onePortion}
                        keyboardType='numeric'
                        mode='outlined'
                        style={styles.textInput}
                        onChangeText={onePortion => setOnePortion(onePortion)}
                        theme={{ colors: { primary: '#0000FF' } }}
                    />
                    <View style={styles.containerWithBtn}>
                        <Button
                            mode="contained"
                            style={styles.button}
                            onPress={() => sendAllData()}>
                            Добавить
                </Button>
                    </View>
                </ScrollView>
            </>
        )
    } else if (data.length <= 0) {
        return (
            <TextInput
                label="Введите название продукта"
                value={text}
                mode='outlined'
                style={styles.container}
                onChangeText={text => setText(text)}
                onFocus={() => setFocus(true)}
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
        width: 320,
        height: 40,
        margin: 20,

    },
    containerWithBtn: {
        justifyContent: 'center',
        alignItems: 'center'
    }


});


export default SearchProduct;