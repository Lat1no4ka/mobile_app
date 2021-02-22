import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import { TextInput, List, Button } from 'react-native-paper';




const GetSettings = ({ navigation }) => {
    <View style={styles.Buttons}>
        <Button
            mode="contained"
            st={styles.Button}
            onPress={() => navigation.navigate('Ценность',{})}>
            Пищевая ценность продукта
        </Button>
    </View>

}
const styles = StyleSheet.create({
    Buttons: {
        alignSelf: 'flex-end',
    },
});

export default GetSettings