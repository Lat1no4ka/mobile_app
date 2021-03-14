import React, { useState, useEffect } from 'react';
import { Card, DataTable, Button } from 'react-native-paper';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native';
import SqlClient from '../../../CommonClient/SqlClient/SqlClient';
import { useNavigation } from '@react-navigation/native';
import HistoryMap from "./HistoryMap";


function HistoryList({navigation}) {
    const [hist, setHist] = useState([]);
    const [hprod, setHprod] = useState([]);//продукт
    const [hnut, setHnut] = useState([]);//компонент
    const [hid, setHid] = useState([]);//id в бд

        useEffect(() => {
            getrow();
        }, []);

     async function getrow() {
            const prodarr = [];
            const nutarr = [];
            const idlist =[];
            let client = SqlClient();
            let selectQuery = await client.ExecuteQuery(`select * from HISTORY`, []);
            var selq = selectQuery.rows;
            for (let i = 0; i < selq.length; i++) {
                prodarr[i]=JSON.parse(selq.item(i).products);
                nutarr[i]=JSON.parse(selq.item(i).nutrient);
                idlist[i]=JSON.parse(selq.item(i).id);
            }
            setHnut(nutarr)
            setHprod(prodarr);
            setHid(idlist);
            console.log(hprod);
            console.log(hnut);
            console.log(hid);

     }

    const removeItem = (id) => {
        console.log(id);
        //let filtered = (hprod.filter((item) => {
            //return (item ? item.id !== id : null)
        //}));
        //setHprod(filtered)
    }

    return (

        <ScrollView>

                 {
                 hprod.map((data) => {
                          return <HistoryMap data={data} key={hid} removeItem={removeItem} itemid={hid} />
                })}

        </ScrollView>

)
}



export default HistoryList;