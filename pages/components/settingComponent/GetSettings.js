import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import SqlClient from '../../../CommonClient/SqlClient/SqlClient';

    



export const GetSettings = ({ navigation }) => {


    const [client, setClient] = useState(SqlClient());



useEffect(( )=> {
    
        getCounts();
        getCount();
        getString();
    const unsubscribe = navigation.addListener("focus", () =>{
        getCounts();
        getCount();
        getString();
    })

return unsubscribe;
        
    
    
},[{navigation}]);


    const [data, setCounts] = useState();
    const [datas, setCount] = useState();
    const [str, setString] = useState([]);
    const [out, setOut] = useState('')

    const getOut = async () => {
    if (str == 0){

        setOut("Используются нормы по умолчанию");


    }
    else {
        setOut("Используются нормы введённые пользователем");
    }
}

    const getCounts = async () => {
        let cntsbckp = 0;
        let selectQuery = await client.ExecuteQuery(`SELECT count(*) as seq FROM PRODUCTBACKUP;`,[]);
                                                    //console.log("test");
        var rows = selectQuery.rows;
        for (let i = 0; i < rows.length; i++) {
            let value = rows.item(i).seq;
            cntsbckp = Number( value );
        }
       // console.log(rows);
        //console.log(cntsbckp);
        setCounts(cntsbckp);


        getOut();

    }
 

    const getCount = async () => {
    
    let cnts = 0;
    let selectQuery = await client.ExecuteQuery(`SELECT count(*) as seq FROM PRODUCT;`, []);
                                               // console.log("test");
    var rows = selectQuery.rows;
    for (let i = 0; i < rows.length; i++) {
        let value = rows.item(i).seq;
        cnts = Number( value );
    }
    console.log(cnts);
    setCount(cnts);

    }
    


    const getString = async () => {
    
        let strng = 0;
        
        let selectQuery = await client.ExecuteQuery(`SELECT * FROM DAILY_RATE
                                                     EXCEPT
                                                     SELECT * FROM DAILY_RATE_BACKUP;`, []);
                                                     console.log("test");
        var rows = selectQuery.rows;
        for (let i = 0; i < rows.length; i++) {
            let value = rows.item(i).protein;
            
            strng = Number(value) ;
        }
        console.log(str);
        setString(strng);
        
        }




    return(

    <View style={styles.Container}>
        
            <Button
                icon="open"
                mode="contained"
                style={styles.Buttons}
                onPress={() => navigation.navigate('Пищевая ценность продуктов',{})}>
                Пищевая ценность продуктов
            </Button>


            <Text style={styles.baseText}>
      Всего продуктов
      <Text style={styles.innerText}> {Number(datas)}</Text>
    </Text>

            <Text style={styles.baseText}>
      Введено пользователем
      <Text style={styles.innerText}> {Number(datas - data)}</Text>
    </Text>
            <Button
                icon="open"
                mode="contained"
                
                style={styles.Buttons}
                onPress={() => navigation.navigate('Нормы суточного потребления',{})}>
                Нормы суточного потребления
            </Button>
            <Text style={styles.innerText}> {out}</Text>
        </View>
        
    )

}
const styles = StyleSheet.create({
    Container: {
        flex: 0.22,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft:20,
        marginRight: 20,
        marginTop: 20
      },
      baseText: {
        fontWeight: 'bold',
        color: 'gray'
      },
      innerText: {
        fontWeight: 'bold',
        color: 'gray'
      }
});

export default GetSettings





       
  
