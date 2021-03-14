import React from 'react';
import { Card, DataTable, Button } from 'react-native-paper';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import SqlClient from '../../../CommonClient/SqlClient/SqlClient';


const HistoryDetails = (props) => {


    const Recount = () => {
        navigation.navigate('Расчет', {
            data, checkedItem
        })
    };



    return (
        <View>
                    <Card.Content>
                    <DataTable>
                    <DataTable.Row>
                        <DataTable.Cell >{props.item.name}</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
                </Card.Content>
        </View>
    )


export default HistoryDetails;