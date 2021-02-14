import React, { useState, useEffect } from 'react';
import { SafeAreaView,StyleSheet, Dimensions,FlatList } from 'react-native';
import { TextInput } from 'react-native-paper';
import SqlClient from '../../CommonClient/SqlClient/SqlClient';
const SearchProduct = () => {
    const [text, setSearch] = useState('');
    const [data, setData] = useState();

    const client = SqlClient();
    const name = () => { client.get('*', 'USER') };

    useEffect(() => {
        console.log(name())
    }, []);


   

   

    return (
        <>
        {console.log("test"+data)}
            <TextInput
                label="Введите название продукта"
                value={text}
                mode='outlined'
                style={styles.container}
                onChangeText={(text) => searchFilterFunction(text)}
                theme={{ colors: { primary: 'blue' } }}
            />
            <SafeAreaView>
            <FlatList
                data={data}
            />
            </SafeAreaView>
        </>
    );
};
const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        margin: 20,
        marginTop: height * 0.15,
        justifyContent: 'flex-start',
        flex: 1,
    },

});

export default SearchProduct;