import React, { useState, useEffect } from 'react';
import { Card, DataTable, Button } from 'react-native-paper';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native';
import SqlClient from '../../../CommonClient/SqlClient/SqlClient';
import { ActivityIndicator } from "react-native";
import { useIsFocused } from '@react-navigation/native'

import HistoryMap from "./HistoryMap";


function HistoryList({ route , navigation }) {
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
            prodarr.push({"id":selq.item(i).id, "product":(JSON.parse(selq.item(i).products)), "nutrient":(JSON.parse(selq.item(i).nutrient))})
        }
        setHprod(prodarr);
    }

    async function removeItem (id) {
        let client = SqlClient();
        await client.ExecuteQuery(`DELETE FROM HISTORY
                                   WHERE id=?`,[id]);
        getrow();
    }

    async function clearHist () {
        let client = SqlClient();
        await client.ExecuteQuery(`DELETE FROM HISTORY;`);
        getrow();
    }

     function recount (item){
        let data = item.product;
        let checkedItem = item.nutrient;
        navigation.navigate('Перерасчет', {
            data, checkedItem
            })
     }


    if (hprod) {
        return (

            <ScrollView>
                <Button
                    style={{backgroundColor:"blue"}}
                    mode="contained"
                    onPress={() => clearHist()}>
                    Очистить историю
                </Button>

                {
                    hprod.map((data) => {
                        return <HistoryMap data={data} key={data.id} removeItem={removeItem} recount={recount}/>
                    })
                }



            </ScrollView>

        )
    } else {
        return (<ActivityIndicator size="large" color="#0000ff" />)
    }
}



export default HistoryList;