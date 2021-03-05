import React from 'react';
import { Card, DataTable, Button } from 'react-native-paper';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';


const HistoryDetails = (props) => {


    return (
        <View>
                <Card style={styles.container}>
                <DataTable style={styles.db}>
                    <DataTable.Header>
                        <DataTable.Title >Дата</DataTable.Title>
                        <DataTable.Title >Продукт 1</DataTable.Title>
                        <DataTable.Title >Продукт 2</DataTable.Title>



                    </DataTable.Header>
                    <DataTable.Row>
                        <DataTable.Cell >{props.data.date}</DataTable.Cell>
                        <DataTable.Cell >{props.data.prod_1}</DataTable.Cell>
                        <DataTable.Cell >{props.data.prod_2}</DataTable.Cell>


                    </DataTable.Row>
                </DataTable>

                <View style={{ flexDirection: 'row' }}>
                <Button
                    mode="contained"
                    icon="repeat-outline"
                    style={styles.statbutton}
                    onPress={() => navigation.navigate("Расчет", {
                    })}>
                    Результат
                </Button>

                <Button
                    mode="contained"
                    icon="trash-outline"
                    style={styles.delbutton}
                    onPress={() => this.removeView()}>
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


export default HistoryDetails;