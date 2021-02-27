import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import { TextInput, List, Button } from 'react-native-paper';




const GetSettings = ({ navigation }) => {
    return(

    <View style={styles.Container}>
        <View style={styles.Buttons}></View>
            <Button
                icon="open"
                mode="contained"
                st={styles.Button}
                onPress={() => navigation.navigate('Ценность',{})}>
                Пищевая ценность продукта
            </Button>
            <Button
                icon="open"
                mode="contained"
                
                st={styles.Button}
                onPress={() => navigation.navigate('Нормы',{})}>
                Нормы суточного потребления
            </Button>
        </View>
        
    )
}
const styles = StyleSheet.create({
    Container: {
        //flex: 1,
        //justifyContent: "center",
        
       // paddingHorizontal: 10
      },
      Buttons: {
          flexDirection:'row-reverse'
        //alignItems: "center",
        //backgroundColor: "#DDDDDD",
        //padding: 20,

        //fontSize: 40,
        //fontWeight: '400',
        //color: "#fff",
      }
});

export default GetSettings





       
  
