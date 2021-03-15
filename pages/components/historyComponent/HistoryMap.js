import React, { useState, useEffect } from 'react';
import { Card, DataTable, Button } from 'react-native-paper';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native';
import HistoryDetails from "./HistoryDetails";


const HistoryMap = (props) => {

        const Test = () => {
        }
    return (
        <View>
        <Card style={styles.container}>
                 {
                 props.data.map((item) => {
                    return <HistoryDetails item={item} key={item.id} removeItem={props.removeItem}/>
                })}

                <View style={{ flexDirection: 'row' }}>
                <Button
                    mode="contained"
                    icon="repeat-outline"
                    style={styles.statbutton}
                    onPress={() => Test()}>
                    Результат
                </Button>

                <Button
                    mode="contained"
                    icon="trash-outline"
                    style={styles.delbutton}
                    onPress={() => Test()}>
                    Удалить
                </Button>

                </View>
               </Card>
        </View>
    )


}

const { width } = Dimensions.get('window');
 const styles = StyleSheet.create({

    container: {
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 14,
    },
    statbutton:{
        backgroundColor:"#3fd449",
        width: (width - 20)/2,
        height: 40,
      },
    delbutton:{
          width: (width - 20)/2,
          height: 40,
          alignSelf: 'flex-end',
          backgroundColor: '#fc4949'
      },
     db:{
          backgroundColor: '#ebebeb',

     },
    });

export default HistoryMap;