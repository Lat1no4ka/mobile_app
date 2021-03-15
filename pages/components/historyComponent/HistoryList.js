import React, { useState, useEffect } from 'react';
import { Card, DataTable, Button } from 'react-native-paper';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native';
import SqlClient from '../../../CommonClient/SqlClient/SqlClient';
import { ActivityIndicator } from "react-native";
import { useIsFocused } from '@react-navigation/native'

import HistoryMap from "./HistoryMap";


function HistoryList({ navigation }) {
    const [hist, setHist] = useState([]);
    const [hprod, setHprod] = useState([]);//продукт
    const [hnut, setHnut] = useState([]);//компонент
    const [hid, setHid] = useState([]);//id в бд
    const isFocused = useIsFocused()

    useEffect(() => {
        getrow();
    }, [isFocused]);

    async function getrow() {
        const prodarr = [];
        const nutarr = [];
        const idlist = [];
        let client = SqlClient();
        let selectQuery = await client.ExecuteQuery(`select * from HISTORY`, []);
        var selq = selectQuery.rows;
        for (let i = 0; i < selq.length; i++) {
            //console.log(id)
            prodarr.push(JSON.parse(selq.item(i).products));
            nutarr.push(JSON.parse(selq.item(i).nutrient));
            idlist.push(JSON.parse(selq.item(i).id));
        }
        setHnut(nutarr)
        setHprod(prodarr);
        setHid(idlist);
    }

    const removeItem = (id) => {
        //let filtered = (hprod.filter((item) => {
        //return (item ? item.id !== id : null)
        //}));
        //setHprod(filtered)
    }
    if (hprod && hnut && hid) {
        return (

            <ScrollView>

                {
                    hprod.map((data, index) => {
                        return <HistoryMap data={data} key={index} removeItem={removeItem} itemid={hid} />
                    })
                }

            </ScrollView>

        )
    } else {
        return (<ActivityIndicator size="large" color="#0000ff" />)
    }
}



export default HistoryList;