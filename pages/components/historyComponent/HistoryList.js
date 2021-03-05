import React from 'react';
import { Card, DataTable, Button } from 'react-native-paper';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native';
import * as data from '../../../pages/components/json/example.json';
import * as data2 from '../../../pages/components/json/example2.json';
import { useNavigation } from '@react-navigation/native';
import HistoryDetails from "./HistoryDetails";


function HistoryList({navigation}) {

    const word = data.date;


    return (

        <ScrollView>

         <HistoryDetails data={data}/>
         <HistoryDetails data={data2}/>
         <HistoryDetails data={data}/>
         <HistoryDetails data={data2}/>
         <HistoryDetails data={data2}/>

        </ScrollView>




)
}
export default HistoryList;